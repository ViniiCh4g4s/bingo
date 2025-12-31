import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

// Tipos
interface Ball {
    number: number;
    letter?: string;
}

interface BingoConfig {
    maxNumber: 75 | 90 | 100;
    hasLetters: boolean;
}

// Componente do Globo 3D
const Globe3D: React.FC<{
    isSpinning: boolean;
    onSpinComplete: () => void;
    currentBall: Ball | null;
}> = ({ isSpinning, onSpinComplete, currentBall }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const wireframeRef = useRef<THREE.Mesh | null>(null);
    const ballsRef = useRef<THREE.Mesh[]>([]);
    const animationFrameRef = useRef<number | null>(null);
    const autoRotateRef = useRef(true);
    const targetRotationRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!containerRef.current) return;

        // Setup Three.js
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 5;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(500, 500);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Wireframe (gaiola)
        const wireframeGeometry = new THREE.SphereGeometry(2, 40, 20);
        const wireframeMaterial = new THREE.MeshLambertMaterial({
            color: 0xc0c0c0,
            wireframe: true,
            transparent: true,
            opacity: 0.7
        });
        const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
        scene.add(wireframe);
        wireframeRef.current = wireframe;

        // Globo interno escuro
        const globeGeometry = new THREE.SphereGeometry(1.75, 30, 30);
        const globeMaterial = new THREE.MeshLambertMaterial({
            color: 0x1a1a2e,
            transparent: true,
            opacity: 0.6
        });
        const globe = new THREE.Mesh(globeGeometry, globeMaterial);
        scene.add(globe);

        // Luzes
        const light1 = new THREE.DirectionalLight(0xb1cfe2, 0.75);
        light1.position.set(1.5, 2, 2);
        scene.add(light1);

        const light2 = new THREE.DirectionalLight(0xd9d2cb, 1);
        light2.position.set(-1.5, -2, 2);
        scene.add(light2);

        const light3 = new THREE.DirectionalLight(0xffffff, 1);
        light3.position.set(-2, 2, -2);
        scene.add(light3);

        const light4 = new THREE.DirectionalLight(0xffffff, 0.25);
        light4.position.set(2, 2, -2);
        scene.add(light4);

        // Criar bolinhas dentro do globo
        const colors = [0x3b82f6, 0xef4444, 0xfbbf24, 0x22c55e, 0xf97316];
        for (let i = 0; i < 15; i++) {
            const ballGeometry = new THREE.SphereGeometry(0.15, 16, 16);
            const ballMaterial = new THREE.MeshLambertMaterial({
                color: colors[i % 5],
                transparent: true,
                opacity: 0.8
            });
            const ball = new THREE.Mesh(ballGeometry, ballMaterial);

            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const radius = 1.3;

            ball.position.x = radius * Math.sin(phi) * Math.cos(theta);
            ball.position.y = radius * Math.sin(phi) * Math.sin(theta);
            ball.position.z = radius * Math.cos(phi);

            ball.userData = {
                velocity: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                }
            };

            scene.add(ball);
            ballsRef.current.push(ball);
        }

        // Animation loop
        const animate = () => {
            animationFrameRef.current = requestAnimationFrame(animate);

            if (autoRotateRef.current) {
                wireframe.rotation.y += 0.002;
            } else {
                const easing = 0.1;
                const yDistance = wireframe.rotation.y - targetRotationRef.current.y;
                const xDistance = wireframe.rotation.x - targetRotationRef.current.x;

                wireframe.rotation.y -= yDistance * easing;
                wireframe.rotation.x -= xDistance * easing;
            }

            if (isSpinning) {
                ballsRef.current.forEach(ball => {
                    ball.position.x += ball.userData.velocity.x;
                    ball.position.y += ball.userData.velocity.y;
                    ball.position.z += ball.userData.velocity.z;

                    const distance = Math.sqrt(
                        ball.position.x ** 2 +
                        ball.position.y ** 2 +
                        ball.position.z ** 2
                    );

                    if (distance > 1.5) {
                        ball.position.normalize().multiplyScalar(1.5);
                        ball.userData.velocity.x *= -0.8;
                        ball.userData.velocity.y *= -0.8;
                        ball.userData.velocity.z *= -0.8;
                    }

                    ball.rotation.x += 0.1;
                    ball.rotation.y += 0.1;
                });
            }

            renderer.render(scene, camera);
        };
        animate();

        // Mouse controls
        let isDragging = false;
        let lastX = 0;
        let lastY = 0;
        let autoRotateTimeout: NodeJS.Timeout | null = null;

        const handleMouseDown = (e: MouseEvent) => {
            isDragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
            autoRotateRef.current = false;
            if (autoRotateTimeout) clearTimeout(autoRotateTimeout);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;

            const deltaX = lastX - e.clientX;
            const deltaY = lastY - e.clientY;
            lastX = e.clientX;
            lastY = e.clientY;

            targetRotationRef.current.y = wireframe.rotation.y - (deltaX / 100) * 4;
            targetRotationRef.current.x = wireframe.rotation.x - (deltaY / 100) * 4;
        };

        const handleMouseUp = () => {
            isDragging = false;
            autoRotateTimeout = setTimeout(() => {
                autoRotateRef.current = true;
            }, 4000);
        };

        renderer.domElement.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            renderer.domElement.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            if (autoRotateTimeout) clearTimeout(autoRotateTimeout);
        };
    }, []);

    useEffect(() => {
        if (isSpinning && wireframeRef.current) {
            autoRotateRef.current = false;

            const spinInterval = setInterval(() => {
                if (wireframeRef.current) {
                    wireframeRef.current.rotation.y += 0.3;
                    wireframeRef.current.rotation.x += 0.2;
                    wireframeRef.current.rotation.z += 0.15;
                }
            }, 16);

            setTimeout(() => {
                clearInterval(spinInterval);
                autoRotateRef.current = true;
                onSpinComplete();
            }, 3000);

            return () => clearInterval(spinInterval);
        }
    }, [isSpinning, onSpinComplete]);

    return (
        <div className="relative">
            <div ref={containerRef} className="mx-auto" style={{ width: 500, height: 500 }} />

            {/* Número sorteado - surge do centro */}
            {currentBall && !isSpinning && (
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                        animation: 'growFromCenter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                    }}
                >
                    <div className={`
            w-56 h-56 rounded-full
            bg-gradient-to-br ${getBallColor(currentBall.letter)}
            shadow-2xl flex items-center justify-center
            border-4 border-white/50
          `}>
                        <div className="text-center">
                            {currentBall.letter && (
                                <div className="text-6xl font-bold text-white drop-shadow-lg">
                                    {currentBall.letter}
                                </div>
                            )}
                            <div className="text-8xl font-black text-white drop-shadow-lg">
                                {currentBall.number}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper function
const getBallColor = (letter?: string): string => {
    switch (letter) {
        case 'B': return 'from-blue-500 to-blue-600';
        case 'I': return 'from-red-500 to-red-600';
        case 'N': return 'from-yellow-400 to-yellow-500';
        case 'G': return 'from-green-500 to-green-600';
        case 'O': return 'from-orange-500 to-orange-600';
        default: return 'from-purple-500 to-purple-600';
    }
};

const getLetterForNumber = (num: number, hasLetters: boolean): string | undefined => {
    if (!hasLetters) return undefined;
    if (num >= 1 && num <= 15) return 'B';
    if (num >= 16 && num <= 30) return 'I';
    if (num >= 31 && num <= 45) return 'N';
    if (num >= 46 && num <= 60) return 'G';
    if (num >= 61 && num <= 75) return 'O';
    return undefined;
};

// Componente Principal
const BingoOnline: React.FC = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [config, setConfig] = useState<BingoConfig>({ maxNumber: 75, hasLetters: true });
    const [currentBall, setCurrentBall] = useState<Ball | null>(null);
    const [history, setHistory] = useState<Ball[]>([]);
    const [isSpinning, setIsSpinning] = useState(false);
    const [availableNumbers, setAvailableNumbers] = useState<number[]>([]);
    const [showBingoModal, setShowBingoModal] = useState(false);
    const [bingoInput, setBingoInput] = useState('');
    const [verifiedNumbers, setVerifiedNumbers] = useState<number[]>([]);
    const [bingoError, setBingoError] = useState('');

    const startGame = (maxNumber: 75 | 90 | 100, hasLetters: boolean) => {
        setConfig({ maxNumber, hasLetters });
        const numbers = [];
        for (let i = 1; i <= maxNumber; i++) {
            numbers.push(i);
        }
        setAvailableNumbers(numbers);
        setGameStarted(true);
    };

    const spinGlobe = () => {
        if (isSpinning || availableNumbers.length === 0) return;
        setIsSpinning(true);
        setCurrentBall(null);
    };

    const handleSpinComplete = () => {
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const selectedNumber = availableNumbers[randomIndex];
        const letter = getLetterForNumber(selectedNumber, config.hasLetters);

        const ball: Ball = { number: selectedNumber, letter };
        setCurrentBall(ball);
        setHistory([ball, ...history]);
        setAvailableNumbers(availableNumbers.filter((_, index) => index !== randomIndex));
        setIsSpinning(false);
    };

    const resetGame = () => {
        const confirmed = window.confirm('⚠️ Tem certeza que deseja finalizar a partida de bingo?\n\nTodos os números sorteados serão perdidos e o jogo será reiniciado.');

        if (confirmed) {
            setCurrentBall(null);
            setHistory([]);
            setVerifiedNumbers([]);
            const numbers = [];
            for (let i = 1; i <= config.maxNumber; i++) {
                numbers.push(i);
            }
            setAvailableNumbers(numbers);
        }
    };

    const closeBingoModal = () => {
        setShowBingoModal(false);
        setBingoInput('');
        setBingoError('');
        setVerifiedNumbers([]);
    };

    const verifyBingoNumber = () => {
        const num = parseInt(bingoInput);
        if (isNaN(num) || num < 1 || num > config.maxNumber) {
            setBingoError(`Número inválido! Digite entre 1 e ${config.maxNumber}`);
            return;
        }

        if (verifiedNumbers.includes(num)) {
            setBingoError('Número já verificado!');
            return;
        }

        const drawnNumbers = history.map(ball => ball.number);
        if (drawnNumbers.includes(num)) {
            setVerifiedNumbers([...verifiedNumbers, num]);
            setBingoInput('');
            setBingoError('');
        } else {
            setBingoError(`❌ O número ${num} NÃO FOI SORTEADO! Bingo inválido!`);
        }
    };

    const handleBingoInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            verifyBingoNumber();
        }
    };

    // Tela Inicial
    if (!gameStarted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/20 max-w-2xl w-full">
                    <h1 className="text-6xl font-bold text-white mb-4 text-center drop-shadow-2xl">
                        🎱 BINGO ONLINE
                    </h1>
                    <p className="text-xl text-purple-200 mb-12 text-center">
                        Configure seu jogo de bingo
                    </p>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Quantos números tem o bingo?
                            </h2>
                            <div className="grid grid-cols-3 gap-4">
                                <button
                                    onClick={() => startGame(75, true)}
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-8 px-6 rounded-2xl transform hover:scale-105 transition-all duration-200 shadow-xl"
                                >
                                    <div className="text-5xl mb-2">75</div>
                                    <div className="text-sm">Com letras B-I-N-G-O</div>
                                </button>
                                <button
                                    onClick={() => startGame(90, false)}
                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-8 px-6 rounded-2xl transform hover:scale-105 transition-all duration-200 shadow-xl"
                                >
                                    <div className="text-5xl mb-2">90</div>
                                    <div className="text-sm">Apenas números</div>
                                </button>
                                <button
                                    onClick={() => startGame(100, false)}
                                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-8 px-6 rounded-2xl transform hover:scale-105 transition-all duration-200 shadow-xl"
                                >
                                    <div className="text-5xl mb-2">100</div>
                                    <div className="text-sm">Apenas números</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Tela do Jogo
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-6xl font-bold text-white mb-2 drop-shadow-2xl">
                        🎱 BINGO {config.maxNumber}
                    </h1>
                    <p className="text-xl text-purple-200">
                        {availableNumbers.length} números restantes
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Globo Principal */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                            <Globe3D
                                isSpinning={isSpinning}
                                onSpinComplete={handleSpinComplete}
                                currentBall={currentBall}
                            />

                            {/* Botões */}
                            <div className="flex gap-4 justify-center mt-8">
                                <button
                                    onClick={spinGlobe}
                                    disabled={isSpinning || availableNumbers.length === 0}
                                    className={`
                    px-12 py-6 rounded-2xl font-bold text-2xl
                    transform transition-all duration-200
                    flex items-center gap-3
                    ${isSpinning || availableNumbers.length === 0
                                        ? 'bg-gray-500 cursor-not-allowed opacity-50'
                                        : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105 shadow-2xl hover:shadow-green-500/50'
                                    }
                    text-white
                  `}
                                >
                                    {isSpinning ? 'GIRANDO...' : 'GIRAR GLOBO'}
                                </button>

                                <button
                                    onClick={() => setShowBingoModal(true)}
                                    disabled={history.length === 0}
                                    className={`
                    px-8 py-6 rounded-2xl font-bold text-xl
                    transform transition-all duration-200
                    ${history.length === 0
                                        ? 'bg-gray-500 cursor-not-allowed opacity-50'
                                        : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 hover:scale-105 shadow-2xl hover:shadow-yellow-500/50'
                                    }
                    text-white
                  `}
                                >
                                    🏆 VERIFICAR BINGO!
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Histórico */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 h-full">
                            <h2 className="text-3xl font-bold text-white mb-6">
                                📋 Histórico
                            </h2>

                            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                {history.length === 0 ? (
                                    <p className="text-purple-200 text-center py-8">
                                        Nenhum número sorteado ainda
                                    </p>
                                ) : (
                                    history.map((ball, index) => (
                                        <div
                                            key={index}
                                            className={`
                        flex items-center gap-3 p-3 rounded-xl
                        bg-gradient-to-r ${getBallColor(ball.letter)}
                        shadow-md transform transition-all duration-200 hover:scale-102
                        ${index === 0 ? 'ring-2 ring-yellow-300 ring-offset-2 ring-offset-purple-900' : ''}
                      `}
                                        >
                                            {ball.letter && (
                                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                          <span className="text-xl font-bold text-white">
                            {ball.letter}
                          </span>
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <div className="text-3xl font-black text-white">
                                                    {ball.number}
                                                </div>
                                            </div>
                                            <div className="text-white/60 text-sm font-mono">
                                                #{history.length - index}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Painel de Números */}
                <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-4">Números Sorteados</h3>
                    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(config.maxNumber, 15)}, minmax(0, 1fr))` }}>
                        {[...Array(config.maxNumber)].map((_, i) => {
                            const num = i + 1;
                            const letter = getLetterForNumber(num, config.hasLetters);
                            const isDrawn = !availableNumbers.includes(num);

                            return (
                                <div
                                    key={num}
                                    className={`
                    aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-bold
                    transition-all duration-300
                    ${isDrawn
                                        ? `bg-gradient-to-br ${getBallColor(letter)} text-white shadow-lg scale-95`
                                        : 'bg-white/5 text-white/30'
                                    }
                  `}
                                >
                                    {letter && <div className="text-[10px]">{letter}</div>}
                                    <div>{num}</div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Botão Finalizar Partida */}
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={resetGame}
                            className="px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transform hover:scale-105 transition-all duration-200 shadow-2xl hover:shadow-red-500/50 flex items-center gap-2"
                        >
                            <span>🛑</span>
                            FINALIZAR PARTIDA DE BINGO
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal de Verificação de Bingo */}
            {showBingoModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-8">
                    <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-3xl p-8 shadow-2xl border-2 border-yellow-400 max-w-2xl w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-4xl font-bold text-white">
                                🏆 VERIFICAR BINGO
                            </h2>
                            <button
                                onClick={closeBingoModal}
                                className="text-white/60 hover:text-white text-3xl"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Números Verificados */}
                        {verifiedNumbers.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-green-400 mb-3">
                                    ✅ Números Corretos ({verifiedNumbers.length})
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {verifiedNumbers.map(num => {
                                        const letter = getLetterForNumber(num, config.hasLetters);
                                        return (
                                            <div
                                                key={num}
                                                className={`
                          px-4 py-2 rounded-lg
                          bg-gradient-to-r ${getBallColor(letter)}
                          text-white font-bold text-lg
                          shadow-lg
                        `}
                                            >
                                                {letter && `${letter}-`}{num}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Input de Verificação */}
                        <div className="mb-6">
                            <label className="block text-white text-xl font-bold mb-3">
                                Digite o número da cartela:
                            </label>
                            <div className="flex gap-3">
                                <input
                                    type="number"
                                    value={bingoInput}
                                    onChange={(e) => {
                                        setBingoInput(e.target.value);
                                        setBingoError('');
                                    }}
                                    onKeyPress={handleBingoInputKeyPress}
                                    placeholder="Ex: 42"
                                    min={1}
                                    max={config.maxNumber}
                                    className="flex-1 px-6 py-4 text-3xl font-bold text-center rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/30"
                                    autoFocus
                                />
                                <button
                                    onClick={verifyBingoNumber}
                                    className="px-8 py-4 rounded-xl font-bold text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transform hover:scale-105 transition-all duration-200 shadow-xl"
                                >
                                    VERIFICAR
                                </button>
                            </div>
                        </div>

                        {/* Mensagem de Erro */}
                        {bingoError && (
                            <div className={`
                p-4 rounded-xl mb-6
                ${bingoError.includes('❌')
                                ? 'bg-red-500/20 border-2 border-red-500 text-red-200'
                                : 'bg-yellow-500/20 border-2 border-yellow-500 text-yellow-200'
                            }
                font-bold text-lg text-center
              `}>
                                {bingoError}
                            </div>
                        )}

                        {/* Instruções */}
                        <div className="text-white/60 text-sm text-center">
                            <p>Digite os números da sua cartela um por um para verificar se todos foram sorteados.</p>
                            <p className="mt-2">Pressione <kbd className="px-2 py-1 bg-white/10 rounded">Enter</kbd> ou clique em VERIFICAR</p>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes growFromCenter {
                    0% {
                        transform: translate(-50%, -50%) scale(0);
                        opacity: 0;
                    }
                    60% {
                        transform: translate(-50%, -50%) scale(1.1);
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 1;
                    }
                }

                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
            `}</style>
        </div>
    );
};

export default BingoOnline;

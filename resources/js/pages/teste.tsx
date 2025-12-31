import React, { useEffect, useRef, useState } from 'react';

// Interfaces para tipos
interface PortfolioItem {
    id: number;
    category: string;
    image: string;
    title: string;
    description: string;
    meta: string;
}

interface Testimonial {
    id: number;
    name: string;
    role: string;
    image: string;
    stars: number;
    text: string;
}

const MyResume: React.FC = () => {
    const [activeSection, setActiveSection] = useState('hero');
    const [headerVisible, setHeaderVisible] = useState(false);
    const [scrollTopVisible, setScrollTopVisible] = useState(false);
    const [activeFaq, setActiveFaq] = useState<number | null>(0);
    const [portfolioFilter, setPortfolioFilter] = useState('*');
    const typedRef = useRef<any>(null);

    // Dados do portfólio
    const portfolioItems: PortfolioItem[] = [
        {
            id: 1,
            category: 'filter-web',
            image: 'assets/img/portfolio/portfolio-1.webp',
            title: 'Mobile Banking App',
            description:
                'Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
            meta: 'UI/UX Design',
        },
        {
            id: 2,
            category: 'filter-system',
            image: 'assets/img/portfolio/portfolio-10.webp',
            title: 'E-Learning Platform',
            description:
                'Nulla vitae elit libero, a pharetra augue mollis interdum.',
            meta: 'Development',
        },
        {
            id: 3,
            category: 'filter-ai',
            image: 'assets/img/portfolio/portfolio-7.webp',
            title: 'Urban Architecture',
            description:
                'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
            meta: 'Photography',
        },
        {
            id: 4,
            category: 'filter-iot',
            image: 'assets/img/portfolio/portfolio-4.webp',
            title: 'Social Media Campaign',
            description:
                'Quis autem vel eum iure reprehenderit qui in ea voluptate.',
            meta: 'Marketing',
        },
        {
            id: 5,
            category: 'filter-web',
            image: 'assets/img/portfolio/portfolio-2.webp',
            title: 'Smart Home Interface',
            description:
                'At vero eos et accusamus et iusto odio dignissimos ducimus.',
            meta: 'UI/UX Design',
        },
        {
            id: 6,
            category: 'filter-system',
            image: 'assets/img/portfolio/portfolio-11.webp',
            title: 'Cloud Management System',
            description: 'Temporibus autem quibusdam et aut officiis debitis.',
            meta: 'Development',
        },
        {
            id: 7,
            category: 'filter-ai',
            image: 'assets/img/portfolio/portfolio-8.webp',
            title: 'Nature Collection',
            description:
                'Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
            meta: 'Photography',
        },
        {
            id: 8,
            category: 'filter-iot',
            image: 'assets/img/portfolio/portfolio-5.webp',
            title: 'Brand Strategy',
            description:
                'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum.',
            meta: 'Marketing',
        },
    ];

    // Dados dos depoimentos
    const testimonials: Testimonial[] = [
        {
            id: 1,
            name: 'Jane Smith',
            role: 'Book Enthusiast',
            image: 'assets/img/person/person-f-1.webp',
            stars: 5,
            text: 'Proin eget tortor risus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla quis lorem ut libero malesuada feugiat.',
        },
        {
            id: 2,
            name: 'Michael Johnson',
            role: 'Sci-Fi Blogger',
            image: 'assets/img/person/person-m-2.webp',
            stars: 5,
            text: 'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus.',
        },
        {
            id: 3,
            name: 'Emily Davis',
            role: 'Book Club President',
            image: 'assets/img/person/person-f-3.webp',
            stars: 4.5,
            text: 'Quisque velit nisi, pretium ut lacinia in, elementum id enim. Cras ultricies ligula sed magna dictum porta. Donec sollicitudin molestie malesuada.',
        },
        {
            id: 4,
            name: 'Robert Wilson',
            role: 'Literary Reviewer',
            image: 'assets/img/person/person-m-4.webp',
            stars: 5,
            text: 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur aliquet quam id dui posuere blandit. Lorem ipsum dolor sit amet, consectetur.',
        },
    ];

    const faqs = [
        {
            question: 'Qual o prazo médio para um site ou painel?',
            answer: 'Varia conforme o escopo. Em geral, landings: 1–2 semanas; painéis com CRUD e autenticação: 3–6 semanas, com entregas parciais.',
        },
        {
            question: 'Como funcionam os pagamentos?',
            answer: 'Normalmente 40% para início, 40% na aprovação das principais telas e 20% na entrega. Posso emitir cobrança via PIX/Stripe.',
        },
        {
            question: 'Você dá suporte após a entrega?',
            answer: 'Sim. Ofereço um período de garantia para correções e planos mensais de suporte/horas para evoluções.',
        },
        {
            question: 'Quais tecnologias você usa?',
            answer: 'Laravel/PHP, MySQL, React/Vue (Inertia), Tailwind, ShadCN, Docker, Nginx, n8n/Node‑RED, integrações com PIX/Stripe e, quando necessário, IoT com ESP32/MQTT.',
        },
        {
            question: 'Você assume projetos já iniciados?',
            answer: 'Sim. Faço auditoria de código e proponho um plano de estabilização/entrega contínua.',
        },
    ];

    // Efeito typed.js simulado
    useEffect(() => {
        const strings = [
            'Front-end',
            'Back-end',
            'Integrações',
            'Automações',
            'IA',
        ];
        let currentIndex = 0;
        let currentChar = 0;
        let isDeleting = false;

        const typeEffect = () => {
            const typedElement = document.querySelector('.typed');
            if (!typedElement) return;

            const currentString = strings[currentIndex];

            if (!isDeleting) {
                typedElement.textContent = currentString.substring(
                    0,
                    currentChar + 1,
                );
                currentChar++;

                if (currentChar === currentString.length) {
                    isDeleting = true;
                    setTimeout(typeEffect, 2000);
                    return;
                }
            } else {
                typedElement.textContent = currentString.substring(
                    0,
                    currentChar - 1,
                );
                currentChar--;

                if (currentChar === 0) {
                    isDeleting = false;
                    currentIndex = (currentIndex + 1) % strings.length;
                }
            }

            setTimeout(typeEffect, isDeleting ? 50 : 100);
        };

        setTimeout(typeEffect, 100);
    }, []);

    // Scroll spy e animações
    useEffect(() => {
        const handleScroll = () => {
            // Scroll top button
            setScrollTopVisible(window.scrollY > 100);

            // Nav spy
            const sections = document.querySelectorAll('section[id]');
            const scrollY = window.pageYOffset;

            sections.forEach((section) => {
                const sectionTop = (section as HTMLElement).offsetTop - 200;
                const sectionHeight = (section as HTMLElement).offsetHeight;
                const sectionId = section.getAttribute('id');

                if (
                    scrollY > sectionTop &&
                    scrollY <= sectionTop + sectionHeight
                ) {
                    setActiveSection(sectionId || '');
                }
            });

            // Animar skill bars quando visível
            const skillsSection = document.querySelector('.skills-animation');
            if (skillsSection) {
                const rect = skillsSection.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8) {
                    document.querySelectorAll('.progress-bar').forEach((el) => {
                        const progressBar = el as HTMLElement;
                        const value = progressBar.getAttribute('aria-valuenow');
                        progressBar.style.width = `${value}%`;
                    });
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Preloader
    useEffect(() => {
        const timer = setTimeout(() => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.style.display = 'none';
            }
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const filterPortfolio = (filter: string) => {
        setPortfolioFilter(filter);
    };

    const filteredPortfolio =
        portfolioFilter === '*'
            ? portfolioItems
            : portfolioItems.filter(
                  (item) => item.category === portfolioFilter,
              );

    // Renderizar estrelas
    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={`full-${i}`} className="bi bi-star-fill"></i>);
        }
        if (hasHalfStar) {
            stars.push(<i key="half" className="bi bi-star-half"></i>);
        }
        return stars;
    };

    return (
        <>
            <style>{`
        /* Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css');

        :root {
          --default-font: "Roboto", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
          --heading-font: "Raleway", sans-serif;
          --nav-font: "Poppins", sans-serif;
          --background-color: #ffffff;
          --default-color: #272829;
          --heading-color: #45505b;
          --accent-color: #18161f;
          --surface-color: #ffffff;
          --contrast-color: #ffffff;
          --nav-color: #45505b;
          --nav-hover-color: #18161f;
          --nav-mobile-background-color: #ffffff;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          color: var(--default-color);
          background-color: var(--background-color);
          font-family: var(--default-font);
          line-height: 1.6;
        }

        a {
          color: var(--accent-color);
          text-decoration: none;
          transition: 0.3s;
        }

        a:hover {
          opacity: 0.8;
        }

        h1, h2, h3, h4, h5, h6 {
          color: var(--heading-color);
          font-family: var(--heading-font);
        }

        .light-background {
          background-color: #f9f9f9;
        }

        /* Header */
        .header {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          padding: 0 15px;
          transition: all 0.3s;
          overflow-y: auto;
          z-index: 997;
          min-width: 200px;
        }

        @media (max-width: 1199px) {
          .header {
            background-color: var(--background-color);
            border-right: 1px solid rgba(0,0,0,0.1);
            width: 300px;
            left: ${headerVisible ? '0' : '-100%'};
          }
        }

        .header-toggle {
          color: var(--contrast-color);
          background-color: var(--accent-color);
          font-size: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          position: fixed;
          top: 15px;
          right: 15px;
          z-index: 9999;
          transition: 0.3s;
          border: none;
        }

        @media (min-width: 1200px) {
          .header-toggle {
            display: none;
          }
        }

        /* Navigation */
        .navmenu ul {
          list-style: none;
          padding: 0 0 20px 0;
          margin: 0;
          width: 140px;
        }

        .navmenu a {
          color: var(--nav-color);
          font-family: var(--nav-font);
          display: flex;
          align-items: center;
          padding: 10px 18px;
          margin-bottom: 8px;
          font-size: 15px;
          border-radius: 50px;
          background: rgba(0,0,0,0.08);
          height: 56px;
          width: 100%;
          overflow: hidden;
          transition: 0.3s;
        }

        .navmenu a i {
          font-size: 20px;
        }

        .navmenu a span {
          padding: 0 5px 0 7px;
        }

        @media (min-width: 992px) {
          .navmenu a {
            max-width: 56px;
          }
          .navmenu a span {
            display: none;
          }
          .navmenu a:hover,
          .navmenu a.active {
            max-width: 100%;
          }
          .navmenu a:hover span,
          .navmenu a.active span {
            display: block;
          }
        }

        .navmenu a:hover,
        .navmenu a.active {
          color: var(--contrast-color);
          background: var(--nav-hover-color);
        }

        /* Main content */
        @media (min-width: 1200px) {
          main {
            margin-left: 200px;
          }
        }

        section {
          padding: 60px 0;
          overflow: hidden;
        }

        .container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 15px;
        }

        @media (min-width: 1400px) {
          .container {
            max-width: 1320px;
          }
        }

        /* Section titles */
        .section-title {
          text-align: center;
          padding-bottom: 60px;
        }

        .section-title h2 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 20px;
          padding-bottom: 20px;
          position: relative;
        }

        .section-title h2::before {
          content: "";
          position: absolute;
          display: block;
          width: 160px;
          height: 1px;
          background: rgba(0,0,0,0.4);
          left: 0;
          right: 0;
          bottom: 1px;
          margin: auto;
        }

        .section-title h2::after {
          content: "";
          position: absolute;
          display: block;
          width: 60px;
          height: 3px;
          background: var(--accent-color);
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
        }

        /* Hero Section */
        .hero {
          width: 100%;
          min-height: 100vh;
          position: relative;
          padding: 80px 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero img {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        .hero::before {
          content: "";
          background: rgba(255,255,255,0.7);
          position: absolute;
          inset: 0;
          z-index: 2;
        }

        .hero .container {
          position: relative;
          z-index: 3;
          text-align: center;
        }

        .hero h2 {
          margin: 0;
          font-size: 64px;
          font-weight: 700;
        }

        .hero p {
          margin: 5px 0 0 0;
          font-size: 26px;
        }

        .hero p span {
          letter-spacing: 1px;
          border-bottom: 2px solid var(--accent-color);
        }

        .hero .social-links {
          margin-top: 25px;
        }

        .hero .social-links a {
          font-size: 20px;
          display: inline-block;
          color: rgba(0,0,0,0.7);
          margin-right: 20px;
          transition: 0.3s;
        }

        .hero .social-links a:hover {
          color: var(--accent-color);
        }

        @media (max-width: 768px) {
          .hero h2 {
            font-size: 32px;
          }
          .hero p {
            font-size: 20px;
          }
        }

        /* About Section */
        .about .profile-image-wrapper {
          position: relative;
        }

        .about .profile-image {
          position: relative;
          width: 280px;
          height: 280px;
          margin: 0 auto 40px;
          border-radius: 50%;
          overflow: hidden;
          border: 5px solid var(--accent-color);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .about .profile-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .about .signature-section {
          text-align: center;
        }

        .about .signature {
          max-width: 200px;
          height: auto;
          margin-bottom: 15px;
          opacity: 0.8;
        }

        .about .quote {
          font-style: italic;
          color: rgba(0,0,0,0.7);
          font-size: 14px;
          margin: 0;
        }

        .about .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .about .skill-item {
          text-align: center;
          padding: 20px;
          border-radius: 10px;
          background: rgba(24,22,31,0.06);
          border: 1px solid rgba(24,22,31,0.15);
          transition: all 0.3s;
        }

        .about .skill-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .about .skill-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--accent-color);
          border-radius: 50%;
          color: var(--contrast-color);
          font-size: 24px;
        }

        .about .journey-timeline {
          margin-bottom: 40px;
        }

        .about .timeline-item {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          padding: 15px;
          border-left: 3px solid var(--accent-color);
          background: rgba(255,255,255,0.7);
          border-radius: 0 8px 8px 0;
          transition: all 0.3s;
        }

        .about .timeline-item:hover {
          background: rgba(24,22,31,0.05);
        }

        .about .timeline-item .year {
          font-weight: 700;
          color: var(--accent-color);
          font-size: 18px;
          min-width: 80px;
          margin-right: 20px;
        }

        .about .cta-section .fun-fact {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 30px;
          padding: 15px 25px;
          background: rgba(24,22,31,0.06);
          border-radius: 50px;
          border: 1px solid rgba(24,22,31,0.15);
        }

        .about .cta-section .fun-fact .emoji {
          font-size: 20px;
          margin-right: 10px;
        }

        .about .action-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
        }

        .about .btn {
          padding: 12px 30px;
          font-weight: 600;
          border-radius: 50px;
          transition: all 0.3s;
          font-size: 15px;
          display: inline-block;
        }

        .about .btn-primary {
          background: var(--accent-color);
          color: var(--contrast-color);
          border: 2px solid var(--accent-color);
        }

        .about .btn-primary:hover {
          transform: translateY(-2px);
        }

        .about .btn-outline {
          background: transparent;
          color: var(--accent-color);
          border: 2px solid var(--accent-color);
        }

        .about .btn-outline:hover {
          background: var(--accent-color);
          color: var(--contrast-color);
        }

        /* Skills Section */
        .skills .row {
          display: flex;
          flex-wrap: wrap;
          margin: 0 -15px;
        }

        .skills .col-lg-8 {
          flex: 0 0 66.666667%;
          max-width: 66.666667%;
          padding: 0 15px;
        }

        .skills .col-lg-4 {
          flex: 0 0 33.333333%;
          max-width: 33.333333%;
          padding: 0 15px;
        }

        .skills .col-md-6 {
          flex: 0 0 50%;
          max-width: 50%;
          padding: 0 15px;
        }

        @media (max-width: 991px) {
          .skills .col-lg-8,
          .skills .col-lg-4 {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }

        @media (max-width: 767px) {
          .skills .col-md-6 {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }

        .skills .skills-grid .row {
          margin: 0 -15px;
        }

        .skills .g-4 {
          margin: -15px;
        }

        .skills .g-4 > * {
          padding: 15px;
        }

        .skills .skill-card {
          background: linear-gradient(135deg, #fff 0%, rgba(24,22,31,0.05) 100%);
          border-radius: 15px;
          padding: 30px;
          height: 100%;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(24,22,31,0.15);
          transition: all 0.3s;
        }

        .skills .skill-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, var(--accent-color), #45505b);
        }

        .skills .skill-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        .skills .skill-header {
          display: flex;
          align-items: center;
          margin-bottom: 25px;
          gap: 15px;
        }

        .skills .skill-header i {
          font-size: 28px;
          color: var(--accent-color);
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(24,22,31,0.1);
          border-radius: 12px;
        }

        .skills .skill-header h3 {
          font-size: 20px;
          margin: 0;
        }

        .skills .skill-item {
          margin-bottom: 20px;
        }

        .skills .skill-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .skills .skill-name {
          font-weight: 600;
          font-size: 15px;
        }

        .skills .skill-percentage {
          font-size: 14px;
          font-weight: 700;
          color: var(--accent-color);
        }

        .skills .progress {
          height: 6px;
          background: rgba(0,0,0,0.08);
          border-radius: 10px;
          overflow: hidden;
        }

        .skills .progress-bar {
          height: 100%;
          background: linear-gradient(45deg, var(--accent-color), #45505b);
          border-radius: 10px;
          width: 0;
          transition: width 1.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .skills .skills-summary {
          background: var(--surface-color);
          padding: 40px 30px;
          border-radius: 15px;
          height: fit-content;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .skills .skills-summary h3 {
          margin-bottom: 20px;
          font-size: 24px;
        }

        .skills .summary-stats {
          margin-bottom: 30px;
        }

        .skills .stat-item {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          gap: 15px;
        }

        .skills .stat-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-color), #45505b);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .skills .stat-circle i {
          color: var(--contrast-color);
          font-size: 20px;
        }

        .skills .stat-number {
          display: block;
          font-size: 16px;
          font-weight: 700;
          line-height: 1;
        }

        .skills .stat-label {
          font-size: 14px;
          color: rgba(0,0,0,0.7);
        }

        .skills .badge-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .skills .skill-badge {
          background: linear-gradient(45deg, var(--accent-color), #45505b);
          color: var(--contrast-color);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        /* Services Section */
        .services .row {
          display: flex;
          flex-wrap: wrap;
          margin: 0 -15px;
        }

        .services .g-4 {
          margin: -15px;
        }

        .services .g-4 > * {
          padding: 15px;
        }

        .services .col-lg-4,
        .services .col-md-6 {
          padding: 0 15px;
          margin-bottom: 30px;
        }

        .services .col-lg-4 {
          flex: 0 0 33.333333%;
          max-width: 33.333333%;
        }

        .services .col-md-6 {
          flex: 0 0 50%;
          max-width: 50%;
        }

        @media (max-width: 991px) {
          .services .col-lg-4 {
            flex: 0 0 50%;
            max-width: 50%;
          }
        }

        @media (max-width: 767px) {
          .services .col-md-6 {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }

        .services .service-item {
          height: 100%;
          padding: 2rem;
          background-color: var(--surface-color);
          border-radius: 12px;
          box-shadow: 0 5px 25px rgba(0,0,0,0.05);
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }

        .services .service-item::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 0;
          background-color: var(--accent-color);
          transition: height 0.3s;
        }

        .services .service-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }

        .services .service-item:hover::before {
          height: 100%;
        }

        .services .service-item .icon {
          margin-bottom: 1.5rem;
        }

        .services .service-item .icon i {
          font-size: 2.5rem;
          color: var(--accent-color);
          transition: all 0.3s;
        }

        .services .service-item:hover .icon i {
          transform: scale(1.1) rotate(5deg);
        }

        .services .service-item h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .services .service-item p {
          color: rgba(0,0,0,0.75);
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .services .link-item {
          display: inline-flex;
          align-items: center;
          color: var(--accent-color);
          font-weight: 500;
          transition: 0.3s;
        }

        .services .link-item i {
          margin-left: 0.5rem;
          transition: transform 0.3s;
        }

        .services .link-item:hover i {
          transform: translateX(5px);
        }

        /* Portfolio Section */
        .portfolio .container-fluid {
          max-width: 100%;
          padding: 0 30px;
        }

        .portfolio .portfolio-filters {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 15px;
          padding: 0;
          margin: 0 0 40px;
          list-style: none;
        }

        .portfolio .portfolio-filters li {
          font-size: 15px;
          font-weight: 500;
          padding: 12px 25px;
          cursor: pointer;
          background: var(--surface-color);
          color: var(--default-color);
          border-radius: 30px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s;
        }

        .portfolio .portfolio-filters li:hover {
          color: var(--accent-color);
          transform: translateY(-2px);
          background: rgba(24,22,31,0.08);
        }

        .portfolio .portfolio-filters li.filter-active {
          background: var(--accent-color);
          color: var(--contrast-color);
        }

        .portfolio .row {
          display: flex;
          flex-wrap: wrap;
          margin: 0 -10px;
        }

        .portfolio .col-xl-3 {
          flex: 0 0 25%;
          max-width: 25%;
          padding: 0 10px;
          margin-bottom: 20px;
        }

        .portfolio .col-lg-4 {
          flex: 0 0 33.333333%;
          max-width: 33.333333%;
        }

        .portfolio .col-md-6 {
          flex: 0 0 50%;
          max-width: 50%;
        }

        @media (max-width: 1199px) {
          .portfolio .col-xl-3 {
            flex: 0 0 33.333333%;
            max-width: 33.333333%;
          }
        }

        @media (max-width: 991px) {
          .portfolio .col-lg-4 {
            flex: 0 0 50%;
            max-width: 50%;
          }
        }

        @media (max-width: 767px) {
          .portfolio .col-md-6 {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }

        .portfolio .portfolio-entry {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: var(--surface-color);
          box-shadow: 0 4px 30px rgba(0,0,0,0.05);
        }

        .portfolio .entry-image {
          position: relative;
          margin: 0;
          overflow: hidden;
          aspect-ratio: 4/3;
        }

        .portfolio .entry-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s;
        }

        .portfolio .entry-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%);
          display: flex;
          align-items: flex-end;
          padding: 30px;
          opacity: 0;
          transition: opacity 0.4s;
        }

        .portfolio .portfolio-entry:hover .entry-image img {
          transform: scale(1.05);
        }

        .portfolio .portfolio-entry:hover .entry-overlay {
          opacity: 1;
        }

        .portfolio .entry-meta {
          color: var(--accent-color);
          font-size: 14px;
          font-weight: 500;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .portfolio .entry-title {
          color: var(--contrast-color);
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 20px;
        }

        .portfolio .entry-links {
          display: flex;
          gap: 15px;
        }

        .portfolio .entry-links a {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface-color);
          color: var(--accent-color);
          border-radius: 12px;
          font-size: 20px;
          transition: all 0.3s;
        }

        .portfolio .entry-links a:hover {
          background: var(--accent-color);
          color: var(--contrast-color);
        }

        /* Testimonials Section */
        .testimonials {
          padding: 80px 0;
        }

        .testimonials-container {
          margin-bottom: 60px;
        }

        .testimonials-slider {
          display: flex;
          gap: 30px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding-bottom: 20px;
        }

        .testimonials-slider::-webkit-scrollbar {
          height: 8px;
        }

        .testimonials-slider::-webkit-scrollbar-thumb {
          background: var(--accent-color);
          border-radius: 10px;
        }

        .testimonial-item {
          background-color: var(--surface-color);
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          min-width: 300px;
          scroll-snap-align: start;
          border-top: 3px solid var(--accent-color);
        }

        .testimonial-item .stars {
          margin-bottom: 15px;
          display: flex;
        }

        .testimonial-item .stars i {
          color: #FFD700;
          margin-right: 3px;
          font-size: 16px;
        }

        .testimonial-item p {
          font-size: 15px;
          font-style: italic;
          margin-bottom: 20px;
          line-height: 1.6;
        }

        .testimonial-profile {
          display: flex;
          align-items: center;
        }

        .testimonial-profile img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 4px solid rgba(24,22,31,0.2);
          margin-right: 15px;
        }

        .testimonial-profile h3 {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 5px;
        }

        .testimonial-profile h4 {
          font-size: 14px;
          color: rgba(0,0,0,0.7);
          margin: 0;
          font-weight: normal;
        }

        .overall-rating {
          background-color: var(--surface-color);
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          display: inline-block;
        }

        .overall-rating .rating-number {
          font-size: 48px;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 10px;
        }

        .overall-rating .rating-stars {
          margin-bottom: 15px;
        }

        .overall-rating .rating-stars i {
          color: #FFD700;
          font-size: 22px;
          margin: 0 3px;
        }

        .overall-rating .rating-platforms {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 15px;
          margin-top: 15px;
        }

        .overall-rating .rating-platforms span {
          font-size: 14px;
          color: var(--accent-color);
          background-color: rgba(24,22,31,0.1);
          padding: 5px 15px;
          border-radius: 20px;
        }

        /* FAQ Section */
        .faq .faq-container .faq-item {
          background-color: var(--surface-color);
          position: relative;
          padding: 20px;
          margin-bottom: 15px;
          border: 1px solid rgba(0,0,0,0.15);
          border-radius: 5px;
          cursor: pointer;
          overflow: hidden;
        }

        .faq .faq-item h3 {
          font-weight: 600;
          font-size: 16px;
          margin: 0 30px 0 0;
          transition: 0.3s;
          display: flex;
          align-items: center;
        }

        .faq .faq-item h3:hover {
          color: var(--accent-color);
        }

        .faq .faq-content {
          display: grid;
          grid-template-rows: 0fr;
          transition: 0.3s;
          visibility: hidden;
          opacity: 0;
        }

        .faq .faq-content p {
          margin-bottom: 0;
          overflow: hidden;
        }

        .faq .faq-toggle {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 16px;
          transition: 0.3s;
        }

        .faq .faq-active {
          background-color: rgba(24,22,31,0.03);
          border-color: rgba(24,22,31,0.2);
        }

        .faq .faq-active h3 {
          color: var(--accent-color);
        }

        .faq .faq-active .faq-content {
          grid-template-rows: 1fr;
          visibility: visible;
          opacity: 1;
          padding-top: 10px;
        }

        .faq .faq-active .faq-toggle {
          transform: rotate(90deg);
          color: var(--accent-color);
        }

        /* Contact Section */
        .contact .row {
          display: flex;
          flex-wrap: wrap;
          margin: 0 -15px;
        }

        .contact .col-lg-4 {
          flex: 0 0 33.333333%;
          max-width: 33.333333%;
          padding: 0 15px;
        }

        .contact .col-lg-8 {
          flex: 0 0 66.666667%;
          max-width: 66.666667%;
          padding: 0 15px;
        }

        @media (max-width: 991px) {
          .contact .col-lg-4,
          .contact .col-lg-8 {
            flex: 0 0 100%;
            max-width: 100%;
            margin-bottom: 30px;
          }
        }

        .contact .info-item {
          margin-bottom: 50px;
        }

        .contact .info-item i {
          color: var(--accent-color);
          background: rgba(24,22,31,0.08);
          font-size: 20px;
          width: 44px;
          height: 44px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50px;
          transition: all 0.3s;
          margin-right: 15px;
        }

        .contact .info-item h3 {
          padding: 0;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .contact .info-item p {
          padding: 0;
          margin-bottom: 0;
          font-size: 14px;
        }

        .contact .info-item:hover i {
          background: var(--accent-color);
          color: var(--contrast-color);
        }

        .contact .php-email-form {
          height: 100%;
        }

        .contact .row.gy-4 {
          margin: 0 -15px;
        }

        .contact .col-md-6 {
          flex: 0 0 50%;
          max-width: 50%;
          padding: 0 15px;
          margin-bottom: 20px;
        }

        .contact .col-md-12 {
          flex: 0 0 100%;
          max-width: 100%;
          padding: 0 15px;
          margin-bottom: 20px;
        }

        @media (max-width: 767px) {
          .contact .col-md-6 {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }

        .contact .form-floating {
          position: relative;
          margin-bottom: 1rem;
        }

        .contact .form-control {
          width: 100%;
          padding: 1rem 0.75rem;
          font-size: 14px;
          border: 1px solid rgba(0,0,0,0.2);
          border-radius: 4px;
          background-color: rgba(255,255,255,0.5);
          transition: border-color 0.3s;
        }

        .contact .form-control:focus {
          outline: none;
          border-color: var(--accent-color);
        }

        .contact textarea.form-control {
          min-height: 150px;
          resize: vertical;
        }

        .contact .form-floating label {
          position: absolute;
          top: 0;
          left: 0;
          padding: 1rem 0.75rem;
          pointer-events: none;
          transition: 0.3s;
          color: rgba(0,0,0,0.6);
        }

        .contact .form-control:focus + label,
        .contact .form-control:not(:placeholder-shown) + label {
          top: -0.5rem;
          left: 0.5rem;
          font-size: 12px;
          background: white;
          padding: 0 0.5rem;
        }

        .contact button[type="submit"] {
          color: var(--contrast-color);
          background: var(--accent-color);
          border: 0;
          padding: 10px 30px;
          transition: 0.4s;
          border-radius: 50px;
          cursor: pointer;
        }

        .contact button[type="submit"]:hover {
          opacity: 0.8;
        }

        .contact .loading,
        .contact .error-message,
        .contact .sent-message {
          display: none;
          padding: 15px;
          margin-bottom: 24px;
          text-align: center;
        }

        .contact .error-message {
          background: #df1529;
          color: #ffffff;
        }

        .contact .sent-message {
          color: #ffffff;
          background: #059652;
        }

        .contact .loading {
          background: var(--surface-color);
        }

        /* Footer */
        .footer {
          background-color: #f9f9f9;
          font-size: 14px;
          text-align: center;
          padding: 30px 0;
        }

        .footer h3 {
          font-size: 36px;
          font-weight: 700;
          margin: 0 0 15px 0;
        }

        .footer p {
          font-style: italic;
          padding: 0;
          margin: 0 0 30px 0;
        }

        .footer .social-links {
          margin: 0 0 30px 0;
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .footer .social-links a {
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--accent-color);
          color: var(--contrast-color);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          transition: 0.3s;
        }

        .footer .social-links a:hover {
          opacity: 0.8;
        }

        .footer .copyright {
          padding-top: 25px;
          border-top: 1px solid rgba(0,0,0,0.1);
        }

        .footer .credits {
          font-size: 13px;
          padding-top: 5px;
        }

        /* Preloader */
        #preloader {
          position: fixed;
          inset: 0;
          z-index: 999999;
          overflow: hidden;
          background: var(--background-color);
          transition: all 0.6s;
        }

        #preloader::before {
          content: "";
          position: fixed;
          top: calc(50% - 30px);
          left: calc(50% - 30px);
          border: 6px solid var(--accent-color);
          border-color: var(--accent-color) transparent var(--accent-color) transparent;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: animate-preloader 1.5s linear infinite;
        }

        @keyframes animate-preloader {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Scroll Top */
        .scroll-top {
          position: fixed;
          visibility: ${scrollTopVisible ? 'visible' : 'hidden'};
          opacity: ${scrollTopVisible ? '1' : '0'};
          right: 15px;
          bottom: ${scrollTopVisible ? '15px' : '-15px'};
          z-index: 99999;
          background-color: var(--accent-color);
          width: 44px;
          height: 44px;
          border-radius: 50px;
          transition: all 0.4s;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .scroll-top i {
          font-size: 24px;
          color: var(--contrast-color);
        }

        .scroll-top:hover {
          opacity: 0.8;
        }

        /* Utility classes */
        .d-flex {
          display: flex;
        }

        .align-items-center {
          align-items: center;
        }

        .justify-content-center {
          justify-content: center;
        }

        .text-center {
          text-align: center;
        }

        .mb-3 {
          margin-bottom: 1rem;
        }
      `}</style>

            {/* Preloader */}
            <div id="preloader"></div>

            {/* Header */}
            <header
                id="header"
                className="header d-flex flex-column justify-content-center"
            >
                <button
                    className="header-toggle d-xl-none bi bi-list"
                    onClick={() => setHeaderVisible(!headerVisible)}
                />

                <nav id="navmenu" className="navmenu">
                    <ul>
                        <li>
                            <a
                                href="#hero"
                                className={
                                    activeSection === 'hero' ? 'active' : ''
                                }
                            >
                                <i className="bi bi-house navicon"></i>
                                <span>Início</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#about"
                                className={
                                    activeSection === 'about' ? 'active' : ''
                                }
                            >
                                <i className="bi bi-person navicon"></i>
                                <span>Sobre</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#services"
                                className={
                                    activeSection === 'services' ? 'active' : ''
                                }
                            >
                                <i className="bi bi-hdd-stack navicon"></i>
                                <span>Serviços</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#portfolio"
                                className={
                                    activeSection === 'portfolio'
                                        ? 'active'
                                        : ''
                                }
                            >
                                <i className="bi bi-images navicon"></i>
                                <span>Portfolio</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#faq"
                                className={
                                    activeSection === 'faq' ? 'active' : ''
                                }
                            >
                                <i className="bi bi-question-circle navicon"></i>
                                <span>FAQ</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                className={
                                    activeSection === 'contact' ? 'active' : ''
                                }
                            >
                                <i className="bi bi-envelope navicon"></i>
                                <span>Contato</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>

            <main className="main">
                {/* Hero Section */}
                <section id="hero" className="hero section light-background">
                    <img src="assets/img/hero-bg.jpg" alt="" />

                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-9">
                                <h2>Vinícius Boschetti</h2>
                                <p>
                                    Desenvolvedor{' '}
                                    <span className="typed"></span>
                                    <span
                                        className="typed-cursor typed-cursor--blink"
                                        aria-hidden="true"
                                    >
                                        |
                                    </span>
                                </p>
                                <div className="social-links">
                                    <a
                                        href="https://bit.ly/3Onx2sr"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="bi bi-twitter-x"></i>
                                    </a>
                                    <a
                                        href="https://bit.ly/4eKMVny"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="bi bi-github"></i>
                                    </a>
                                    <a
                                        href="https://bit.ly/3ela6qi"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="bi bi-instagram"></i>
                                    </a>
                                    <a
                                        href="https://bit.ly/3Iiff0B"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="bi bi-linkedin"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="about section">
                    <div className="section-title container">
                        <h2>Sobre</h2>
                        <p>
                            Me chamo Vinicius, desenvolvedor full-stack
                            especializado em Laravel/PHP e React/Vue, criando
                            painéis, APIs, integrações, pagamentos, automações,
                            soluções com IA e projetos de IoT para monitoramento
                            em tempo real.
                        </p>
                    </div>

                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-5">
                                <div className="profile-image-wrapper">
                                    <div className="profile-image">
                                        <img
                                            src="assets/img/profile/profile-square-1.webp"
                                            alt="Vinicius"
                                        />
                                    </div>
                                    <div className="signature-section">
                                        <img
                                            src="assets/img/misc/signature-1.webp"
                                            alt="Assinatura"
                                            className="signature"
                                        />
                                        <p className="quote">
                                            Código limpo, soluções simples e
                                            foco no que gera valor.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-7">
                                <div className="about-content">
                                    <div className="skills-grid">
                                        <div className="skill-item">
                                            <div className="skill-icon">
                                                <i className="bi bi-braces-asterisk"></i>
                                            </div>
                                            <h4>Back‑end</h4>
                                            <p>
                                                Laravel, PHP 8+, MySQL, Redis,
                                                filas, testes, APIs REST.
                                            </p>
                                        </div>
                                        <div className="skill-item">
                                            <div className="skill-icon">
                                                <i className="bi bi-window-sidebar"></i>
                                            </div>
                                            <h4>Front‑end</h4>
                                            <p>
                                                React/Vue, Inertia, Typescript,
                                                Tailwind, ShadCN, UX pragmática.
                                            </p>
                                        </div>
                                        <div className="skill-item">
                                            <div className="skill-icon">
                                                <i className="bi bi-diagram-3"></i>
                                            </div>
                                            <h4>Automação & IA</h4>
                                            <p>
                                                n8n/FlowiseAi, Node‑RED,
                                                webhooks, chatbots, integrações
                                                e fluxos inteligentes.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="journey-timeline">
                                        <div className="timeline-item">
                                            <div className="year">2019</div>
                                            <div className="description">
                                                Início profissional em TI e
                                                automação.
                                            </div>
                                        </div>
                                        <div className="timeline-item">
                                            <div className="year">2023</div>
                                            <div className="description">
                                                Projetos web sob demanda para
                                                empresas e empreendedores.
                                            </div>
                                        </div>
                                        <div className="timeline-item">
                                            <div className="year">2025</div>
                                            <div className="description">
                                                Soluções com IA e IoT aplicadas
                                                ao dia a dia dos negócios.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="cta-section">
                                        <div className="fun-fact">
                                            <span className="emoji">⚡</span>
                                            <span className="text">
                                                Projeto novo? Eu cuido do código
                                                e da entrega.
                                            </span>
                                        </div>
                                        <div className="action-buttons">
                                            <a
                                                href="#services"
                                                className="btn btn-primary"
                                            >
                                                Serviços
                                            </a>
                                            <a
                                                href="#contact"
                                                className="btn btn-outline"
                                            >
                                                Fale comigo
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Skills Section */}
                <section id="skills" className="skills section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="skills-grid">
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <div className="skill-card">
                                                <div className="skill-header">
                                                    <i className="bi bi-code-slash"></i>
                                                    <h3>Front‑end</h3>
                                                </div>
                                                <div className="skills-animation">
                                                    <div className="skill-item">
                                                        <div className="skill-info">
                                                            <span className="skill-name">
                                                                HTML/CSS •
                                                                Tailwind
                                                            </span>
                                                            <span className="skill-percentage">
                                                                95%
                                                            </span>
                                                        </div>
                                                        <div className="skill-bar progress">
                                                            <div
                                                                className="progress-bar"
                                                                role="progressbar"
                                                                aria-valuenow="95"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                    <div className="skill-item">
                                                        <div className="skill-info">
                                                            <span className="skill-name">
                                                                JavaScript/TypeScript
                                                            </span>
                                                            <span className="skill-percentage">
                                                                88%
                                                            </span>
                                                        </div>
                                                        <div className="skill-bar progress">
                                                            <div
                                                                className="progress-bar"
                                                                role="progressbar"
                                                                aria-valuenow="88"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                    <div className="skill-item">
                                                        <div className="skill-info">
                                                            <span className="skill-name">
                                                                React / Vue /
                                                                Inertia
                                                            </span>
                                                            <span className="skill-percentage">
                                                                82%
                                                            </span>
                                                        </div>
                                                        <div className="skill-bar progress">
                                                            <div
                                                                className="progress-bar"
                                                                role="progressbar"
                                                                aria-valuenow="82"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="skill-card">
                                                <div className="skill-header">
                                                    <i className="bi bi-server"></i>
                                                    <h3>Back‑end</h3>
                                                </div>
                                                <div className="skills-animation">
                                                    <div className="skill-item">
                                                        <div className="skill-info">
                                                            <span className="skill-name">
                                                                PHP 8+ / Laravel
                                                            </span>
                                                            <span className="skill-percentage">
                                                                90%
                                                            </span>
                                                        </div>
                                                        <div className="skill-bar progress">
                                                            <div
                                                                className="progress-bar"
                                                                role="progressbar"
                                                                aria-valuenow="90"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                    <div className="skill-item">
                                                        <div className="skill-info">
                                                            <span className="skill-name">
                                                                MySQL • Redis •
                                                                Filas
                                                            </span>
                                                            <span className="skill-percentage">
                                                                80%
                                                            </span>
                                                        </div>
                                                        <div className="skill-bar progress">
                                                            <div
                                                                className="progress-bar"
                                                                role="progressbar"
                                                                aria-valuenow="80"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                    <div className="skill-item">
                                                        <div className="skill-info">
                                                            <span className="skill-name">
                                                                APIs REST •
                                                                Autenticação
                                                            </span>
                                                            <span className="skill-percentage">
                                                                85%
                                                            </span>
                                                        </div>
                                                        <div className="skill-bar progress">
                                                            <div
                                                                className="progress-bar"
                                                                role="progressbar"
                                                                aria-valuenow="85"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="skill-card">
                                                <div className="skill-header">
                                                    <i className="bi bi-robot"></i>
                                                    <h3>IA & Automação</h3>
                                                </div>
                                                <div className="skills-animation">
                                                    <div className="skill-item">
                                                        <div className="skill-info">
                                                            <span className="skill-name">
                                                                n8n • FlowiseAI
                                                                • Node‑RED
                                                            </span>
                                                            <span className="skill-percentage">
                                                                86%
                                                            </span>
                                                        </div>
                                                        <div className="skill-bar progress">
                                                            <div
                                                                className="progress-bar"
                                                                role="progressbar"
                                                                aria-valuenow="86"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                    <div className="skill-item">
                                                        <div className="skill-info">
                                                            <span className="skill-name">
                                                                Chatbots •
                                                                Assistentes de
                                                                IA
                                                            </span>
                                                            <span className="skill-percentage">
                                                                78%
                                                            </span>
                                                        </div>
                                                        <div className="skill-bar progress">
                                                            <div
                                                                className="progress-bar"
                                                                role="progressbar"
                                                                aria-valuenow="78"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                    <div className="skill-item">
                                                        <div className="skill-info">
                                                            <span className="skill-name">
                                                                Integrações de
                                                                pagamento
                                                            </span>
                                                            <span className="skill-percentage">
                                                                84%
                                                            </span>
                                                        </div>
                                                        <div className="skill-bar progress">
                                                            <div
                                                                className="progress-bar"
                                                                role="progressbar"
                                                                aria-valuenow="84"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="skill-card">
                                                <div className="skill-header">
                                                    <i className="bi bi-cloud"></i>
                                                    <h3>
                                                        DevOps & Observabilidade
                                                    </h3>
                                                </div>
                                                <div className="skills-animation">
                                                    <div className="skill-item">
                                                        <div className="skill-info">
                                                            <span className="skill-name">
                                                                Docker • Nginx •
                                                                VPS
                                                            </span>
                                                            <span className="skill-percentage">
                                                                76%
                                                            </span>
                                                        </div>
                                                        <div className="skill-bar progress">
                                                            <div
                                                                className="progress-bar"
                                                                role="progressbar"
                                                                aria-valuenow="76"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                    <div className="skill-item">
                                                        <div className="skill-info">
                                                            <span className="skill-name">
                                                                MQTT • InfluxDB
                                                                • Grafana
                                                            </span>
                                                            <span className="skill-percentage">
                                                                73%
                                                            </span>
                                                        </div>
                                                        <div className="skill-bar progress">
                                                            <div
                                                                className="progress-bar"
                                                                role="progressbar"
                                                                aria-valuenow="73"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                    <div className="skill-item">
                                                        <div className="skill-info">
                                                            <span className="skill-name">
                                                                Git • CI simples
                                                            </span>
                                                            <span className="skill-percentage">
                                                                90%
                                                            </span>
                                                        </div>
                                                        <div className="skill-bar progress">
                                                            <div
                                                                className="progress-bar"
                                                                role="progressbar"
                                                                aria-valuenow="90"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="skills-summary">
                                    <h3>Como eu trabalho</h3>
                                    <p>
                                        Processo enxuto: alinhamos o escopo,
                                        defino entregas por etapas e publico com
                                        versionamento. Comunicação clara,
                                        documentação objetiva e foco em
                                        estabilidade.
                                    </p>

                                    <div className="summary-stats">
                                        <div className="stat-item">
                                            <div className="stat-circle">
                                                <i className="bi bi-lightning"></i>
                                            </div>
                                            <div className="stat-info">
                                                <span className="stat-number">
                                                    Entrega ágil
                                                </span>
                                                <span className="stat-label">
                                                    sprints curtas
                                                </span>
                                            </div>
                                        </div>
                                        <div className="stat-item">
                                            <div className="stat-circle">
                                                <i className="bi bi-shield-check"></i>
                                            </div>
                                            <div className="stat-info">
                                                <span className="stat-number">
                                                    Código sólido
                                                </span>
                                                <span className="stat-label">
                                                    testes e revisão
                                                </span>
                                            </div>
                                        </div>
                                        <div className="stat-item">
                                            <div className="stat-circle">
                                                <i className="bi bi-arrows-angle-expand"></i>
                                            </div>
                                            <div className="stat-info">
                                                <span className="stat-number">
                                                    Escalável
                                                </span>
                                                <span className="stat-label">
                                                    pronto para crescer
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="skills-badges">
                                        <h4>Pilhas favoritas</h4>
                                        <div className="badge-list">
                                            <div className="skill-badge">
                                                Laravel + Inertia
                                            </div>
                                            <div className="skill-badge">
                                                React + ShadCN
                                            </div>
                                            <div className="skill-badge">
                                                Vue + Pinia
                                            </div>
                                            <div className="skill-badge">
                                                Node‑RED + MQTT
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" className="services section">
                    <div className="section-title container">
                        <h2>Serviços</h2>
                        <p>
                            Soluções sob medida para o seu negócio — com foco em
                            prazo, segurança e resultado.
                        </p>
                    </div>

                    <div className="container">
                        <div className="row g-4">
                            <div className="col-lg-4 col-md-6">
                                <div className="service-item">
                                    <div className="icon">
                                        <i className="bi bi-window-stack"></i>
                                    </div>
                                    <h3>Sites e Landings</h3>
                                    <p>
                                        Desenho e implementação de páginas
                                        rápidas, responsivas e com SEO básico
                                        para conversão.
                                    </p>
                                    <div className="card-links">
                                        <a
                                            href="#contact"
                                            className="link-item"
                                        >
                                            Solicitar proposta{' '}
                                            <i className="bi bi-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="service-item">
                                    <div className="icon">
                                        <i className="bi bi-speedometer2"></i>
                                    </div>
                                    <h3>Painéis & APIs</h3>
                                    <p>
                                        CRUDs, autenticação, relatórios,
                                        permissões e integrações em Laravel/PHP
                                        com MySQL.
                                    </p>
                                    <div className="card-links">
                                        <a
                                            href="#contact"
                                            className="link-item"
                                        >
                                            Falar sobre escopo{' '}
                                            <i className="bi bi-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="service-item">
                                    <div className="icon">
                                        <i className="bi bi-robot"></i>
                                    </div>
                                    <h3>IA & Automação</h3>
                                    <p>
                                        Fluxos com n8n/Node‑RED, webhooks,
                                        chatbots e assistentes de IA para
                                        reduzir tarefas repetitivas.
                                    </p>
                                    <div className="card-links">
                                        <a
                                            href="#contact"
                                            className="link-item"
                                        >
                                            Ver possibilidades{' '}
                                            <i className="bi bi-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="service-item">
                                    <div className="icon">
                                        <i className="bi bi-credit-card-2-front"></i>
                                    </div>
                                    <h3>Pagamentos</h3>
                                    <p>
                                        Integração de <strong>PIX</strong>,{' '}
                                        <strong>Stripe</strong> e checkout
                                        seguro com notificações e webhooks.
                                    </p>
                                    <div className="card-links">
                                        <a
                                            href="#contact"
                                            className="link-item"
                                        >
                                            Integrar agora{' '}
                                            <i className="bi bi-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="service-item">
                                    <div className="icon">
                                        <i className="bi bi-cloud-arrow-up"></i>
                                    </div>
                                    <h3>Deploy & Infra</h3>
                                    <p>
                                        VPS, Docker, Nginx e pipelines simples
                                        para publicar e manter seu projeto no
                                        ar.
                                    </p>
                                    <div className="card-links">
                                        <a
                                            href="#contact"
                                            className="link-item"
                                        >
                                            Planejar deploy{' '}
                                            <i className="bi bi-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="service-item">
                                    <div className="icon">
                                        <i className="bi bi-broadcast"></i>
                                    </div>
                                    <h3>IoT & Monitoramento</h3>
                                    <p>
                                        ESP32, MQTT, InfluxDB e Grafana para
                                        coleta de dados, alertas e dashboards em
                                        tempo real.
                                    </p>
                                    <div className="card-links">
                                        <a
                                            href="#contact"
                                            className="link-item"
                                        >
                                            Discutir projeto{' '}
                                            <i className="bi bi-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Portfolio Section */}
                <section id="portfolio" className="portfolio section">
                    <div className="section-title container">
                        <h2>Portfólio</h2>
                        <p>
                            Alguns trabalhos e estudos (prints e demonstrações).
                        </p>
                    </div>

                    <div className="container-fluid">
                        <ul className="portfolio-filters">
                            <li
                                className={
                                    portfolioFilter === '*'
                                        ? 'filter-active'
                                        : ''
                                }
                                onClick={() => filterPortfolio('*')}
                            >
                                <i className="bi bi-grid-3x3"></i> Todos
                            </li>
                            <li
                                className={
                                    portfolioFilter === 'filter-web'
                                        ? 'filter-active'
                                        : ''
                                }
                                onClick={() => filterPortfolio('filter-web')}
                            >
                                Web
                            </li>
                            <li
                                className={
                                    portfolioFilter === 'filter-system'
                                        ? 'filter-active'
                                        : ''
                                }
                                onClick={() => filterPortfolio('filter-system')}
                            >
                                Sistemas
                            </li>
                            <li
                                className={
                                    portfolioFilter === 'filter-ai'
                                        ? 'filter-active'
                                        : ''
                                }
                                onClick={() => filterPortfolio('filter-ai')}
                            >
                                Automação
                            </li>
                            <li
                                className={
                                    portfolioFilter === 'filter-iot'
                                        ? 'filter-active'
                                        : ''
                                }
                                onClick={() => filterPortfolio('filter-iot')}
                            >
                                IoT
                            </li>
                        </ul>

                        <div className="row g-4 isotope-container">
                            {filteredPortfolio.map((item) => (
                                <div
                                    key={item.id}
                                    className="col-xl-3 col-lg-4 col-md-6 portfolio-item"
                                >
                                    <article className="portfolio-entry">
                                        <figure className="entry-image">
                                            <img
                                                src={item.image}
                                                className="img-fluid"
                                                alt={item.title}
                                                loading="lazy"
                                            />
                                            <div className="entry-overlay">
                                                <div className="overlay-content">
                                                    <div className="entry-meta">
                                                        {item.meta}
                                                    </div>
                                                    <h3 className="entry-title">
                                                        {item.title}
                                                    </h3>
                                                    <div className="entry-links">
                                                        <a href={item.image}>
                                                            <i className="bi bi-arrows-angle-expand"></i>
                                                        </a>
                                                        <a href="portfolio-details.html">
                                                            <i className="bi bi-arrow-right"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </figure>
                                    </article>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="testimonials" className="testimonials section">
                    <div className="section-title container">
                        <h2>Depoimentos</h2>
                        <p>O que alguns clientes dizem após a entrega.</p>
                    </div>

                    <div className="container">
                        <div className="testimonials-container">
                            <div className="testimonials-slider">
                                {testimonials.map((testimonial) => (
                                    <div
                                        key={testimonial.id}
                                        className="testimonial-item"
                                    >
                                        <div className="stars">
                                            {renderStars(testimonial.stars)}
                                        </div>
                                        <p>{testimonial.text}</p>
                                        <div className="testimonial-profile">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                            />
                                            <div>
                                                <h3>{testimonial.name}</h3>
                                                <h4>{testimonial.role}</h4>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 text-center">
                                <div className="overall-rating">
                                    <div className="rating-number">4.8</div>
                                    <div className="rating-stars">
                                        {renderStars(4.8)}
                                    </div>
                                    <p>Based on 230+ reviews</p>
                                    <div className="rating-platforms">
                                        <span>Goodreads</span>
                                        <span>Amazon</span>
                                        <span>Barnes & Noble</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="faq section">
                    <div className="section-title container">
                        <h2>FAQ</h2>
                        <p>
                            Dúvidas comuns sobre prazos, escopo e contratação.
                        </p>
                    </div>

                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="faq-container">
                                    {faqs.map((faq, index) => (
                                        <div
                                            key={index}
                                            className={`faq-item ${activeFaq === index ? 'faq-active' : ''}`}
                                            onClick={() => toggleFaq(index)}
                                        >
                                            <h3>{faq.question}</h3>
                                            <div className="faq-content">
                                                <p>{faq.answer}</p>
                                            </div>
                                            <i className="faq-toggle bi bi-chevron-right"></i>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="contact section">
                    <div className="section-title container">
                        <h2>Contato</h2>
                        <p>
                            Entre em contato comigo para discutirmos projetos,
                            oportunidades ou qualquer outra informação.
                        </p>
                    </div>

                    <div className="container">
                        <div className="row gy-4">
                            <div className="col-lg-4">
                                <div className="info-item d-flex">
                                    <i className="bi bi-geo-alt flex-shrink-0"></i>
                                    <div>
                                        <h3>Localidade</h3>
                                        <p>
                                            São José dos Campos, São Paulo,
                                            Brasil
                                        </p>
                                    </div>
                                </div>

                                <div className="info-item d-flex">
                                    <i className="bi bi-telephone flex-shrink-0"></i>
                                    <div>
                                        <h3>Telefone</h3>
                                        <p>+55 (12) 98839-4839</p>
                                    </div>
                                </div>

                                <div className="info-item d-flex">
                                    <i className="bi bi-envelope flex-shrink-0"></i>
                                    <div>
                                        <h3>Email</h3>
                                        <p>contato@viniciusboschetti.com.br</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-8">
                                <form
                                    action="forms/contact.php"
                                    method="post"
                                    className="php-email-form"
                                >
                                    <div className="row gy-4">
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Seu Nome"
                                                    required
                                                />
                                                <label htmlFor="name">
                                                    Seu Nome
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="email"
                                                    placeholder="Seu Email"
                                                    required
                                                />
                                                <label htmlFor="email">
                                                    Seu Email
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="subject"
                                                    placeholder="Assunto"
                                                    required
                                                />
                                                <label htmlFor="subject">
                                                    Assunto
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-floating mb-3">
                                                <textarea
                                                    className="form-control"
                                                    name="message"
                                                    rows={6}
                                                    placeholder="Mensagem"
                                                    required
                                                ></textarea>
                                                <label htmlFor="message">
                                                    Mensagem
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-md-12 text-center">
                                            <div className="loading">
                                                Carregando
                                            </div>
                                            <div className="error-message"></div>
                                            <div className="sent-message">
                                                Sua mensagem foi enviada.
                                                Obrigado!
                                            </div>

                                            <button type="submit">
                                                Enviar Mensagem
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer
                id="footer"
                className="footer position-relative light-background"
            >
                <div className="container">
                    <h3 className="sitename">Vinicius Boschetti</h3>
                    <p>
                        Obrigado por visitar meu portfólio. Sinta-se à vontade
                        para entrar em contato através das minhas redes sociais.
                    </p>
                    <div className="social-links d-flex justify-content-center">
                        <a
                            href="https://bit.ly/3Onx2sr"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="bi bi-twitter"></i>
                        </a>
                        <a
                            href="https://bit.ly/4eKMVny"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="bi bi-github"></i>
                        </a>
                        <a
                            href="https://bit.ly/3ela6qi"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="bi bi-instagram"></i>
                        </a>
                        <a
                            href="https://bit.ly/3Iiff0B"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="bi bi-linkedin"></i>
                        </a>
                    </div>
                    <div className="container">
                        <div className="copyright">
                            <span>&copy; Copyright</span>{' '}
                            <strong className="sitename px-1">
                                Vinicius Boschetti
                            </strong>{' '}
                            <span>Todos os direitos reservados</span>
                        </div>
                        <div className="credits">
                            Template de{' '}
                            <a
                                href="https://bootstrapmade.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                BootstrapMade
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Scroll Top */}
            <div className="scroll-top" onClick={scrollToTop}>
                <i className="bi bi-arrow-up-short"></i>
            </div>
        </>
    );
};

export default MyResume;

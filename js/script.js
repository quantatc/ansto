// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');

        // Change the icon based on menu state
        const isOpen = !mobileMenu.classList.contains('hidden');
        if (isOpen) {
            mobileMenuButton.innerHTML = `
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            `;
        } else {
            mobileMenuButton.innerHTML = `
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            `;
        }
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.innerHTML = `
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            `;
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            header.classList.add('bg-opacity-95', 'shadow-lg');
        } else {
            header.classList.remove('bg-opacity-95', 'shadow-lg');
        }
    });

    // Fetch GitHub Repositories
    fetchGitHubRepos();

    // Initialize contact form
    initContactForm();
});

// Fetch GitHub Repositories
async function fetchGitHubRepos() {
    const projectsSection = document.getElementById('projects-container');
    if (!projectsSection) return;

    try {
        const response = await fetch('https://api.github.com/users/quantatc/repos');

        if (!response.ok) {
            throw new Error('Failed to fetch GitHub repositories');
        }

        const data = await response.json();

        // Filter out forked repositories and sort by stars
        const filteredProjects = data
            .filter(repo => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count);

        // Display projects
        displayProjects(filteredProjects, projectsSection);
    } catch (err) {
        console.error('Error fetching GitHub repositories:', err);

        // Display fallback projects
        const fallbackProjects = [
            {
                name: 'Algorithmic Trading Strategy',
                description: 'Implementation of a mean reversion strategy for equity markets using Python and machine learning.',
                html_url: '#',
                language: 'Python',
                stargazers_count: 15,
                forks_count: 5
            },
            {
                name: 'Financial Data Analysis',
                description: 'Tools for analyzing and visualizing financial market data with advanced statistical methods.',
                html_url: '#',
                language: 'Python',
                stargazers_count: 12,
                forks_count: 3
            },
            {
                name: 'Portfolio Optimization',
                description: 'Modern portfolio theory implementation with risk management techniques.',
                html_url: '#',
                language: 'Python',
                stargazers_count: 10,
                forks_count: 2
            }
        ];

        displayProjects(fallbackProjects, projectsSection);
    }
}

// Display Projects
function displayProjects(projects, container) {
    container.innerHTML = '';

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card animate-fade-in';
        projectCard.style.animationDelay = `${index * 100}ms`;

        projectCard.innerHTML = `
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-100 mb-2">${project.name}</h3>
                <p class="text-gray-300 mb-4 h-20 overflow-hidden">
                    ${project.description || 'No description available'}
                </p>
                <div class="flex justify-between items-center mb-4">
                    <span class="text-sm text-gray-400">
                        ${project.language || 'Various'}
                    </span>
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center">
                            <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <span class="text-gray-400 text-xs">${project.stargazers_count}</span>
                        </div>
                        <div class="flex items-center">
                            <svg class="w-4 h-4 text-gray-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                            </svg>
                            <span class="text-gray-400 text-xs">${project.forks_count}</span>
                        </div>
                    </div>
                </div>
                <a
                    href="${project.html_url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block w-full text-center py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-md transition-colors duration-300"
                >
                    View Project
                </a>
            </div>
        `;

        container.appendChild(projectCard);
    });
}

// Initialize Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const statusMessage = document.getElementById('form-status');

        // Simulate form submission
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <span class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
            </span>
        `;

        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Inquiry';

            statusMessage.classList.remove('hidden');
            statusMessage.classList.add('bg-green-900/30', 'border', 'border-green-700', 'text-green-300');
            statusMessage.textContent = 'Your message has been sent successfully!';

            contactForm.reset();

            setTimeout(() => {
                statusMessage.classList.add('hidden');
            }, 5000);
        }, 1500);
    });
}

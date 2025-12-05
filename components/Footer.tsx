import Link from 'next/link'

const footerLinks = {
  content: [
    { name: 'Articles', href: '/tag/articles' },
    { name: 'Case Studies', href: '/tag/case-studies' },
    { name: 'Interviews', href: '/tag/interviews' },
    { name: 'Events', href: '/tag/events' },
  ],
  topics: [
    { name: 'Process', href: '/tag/process' },
    { name: 'Research', href: '/tag/research' },
    { name: 'Tools', href: '/tag/tools' },
    { name: 'POV', href: '/tag/pov' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
    { name: 'Press', href: '/press' },
  ],
}

const socialLinks = [
  { name: 'Twitter', href: '#', icon: 'twitter' },
  { name: 'LinkedIn', href: '#', icon: 'linkedin' },
  { name: 'Instagram', href: '#', icon: 'instagram' },
  { name: 'Dribbble', href: '#', icon: 'dribbble' },
]

export function Footer() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="mx-auto max-w-content px-6 lg:px-section-x py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr,1fr,1fr,1fr] gap-16">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-neutral-900 rounded-lg" />
              <span className="font-semibold text-lg text-neutral-900">Company Design</span>
            </Link>
            <p className="mt-4 text-footer-link text-neutral-500 max-w-footer-desc">
              Stories, insights, and perspectives from our design team.
            </p>
          </div>

          {/* Content Links */}
          <div>
            <h4 className="text-footer-heading font-semibold text-neutral-900 uppercase mb-5">
              Content
            </h4>
            <ul className="space-y-3">
              {footerLinks.content.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-footer-link text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics Links */}
          <div>
            <h4 className="text-footer-heading font-semibold text-neutral-900 uppercase mb-5">
              Topics
            </h4>
            <ul className="space-y-3">
              {footerLinks.topics.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-footer-link text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-footer-heading font-semibold text-neutral-900 uppercase mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-footer-link text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-body-sm text-neutral-500">
            © {new Date().getFullYear()} Company Name. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="w-6 h-6 flex items-center justify-center bg-neutral-300 rounded text-neutral-500 hover:bg-neutral-400 hover:text-neutral-700 transition-colors"
                aria-label={link.name}
              >
                <span className="sr-only">{link.name}</span>
                <div className="w-4 h-4 bg-current rounded-sm opacity-60" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

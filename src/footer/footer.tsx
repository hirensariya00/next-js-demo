'use client'

import FooterQuickLinks from './footer-quick-links';
import FooterInformation from './footer-information';
import FooterNewsletter from './footer-newsletter/footer-newsletter';
import SocialIcons from './social-icons';
import FooterCopyright from './footer-copyright';
import {pageData} from "@/app/_page-data";

export interface FooterProps {
    pageData: {
        globalSettings: {
            footer_com: any[];
            site_com: any[];
            social_links_com: any[];
        };
    };
}

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="footer-navigation-section">
                <div className="container">
                    <div className="row">
                        <div className="col col-12 col-md-12">
                            <div className="footer-navigation-wrapper">
                                <div className="footer-navigation">
                                    <div className="row">
                                        <FooterQuickLinks pageData={pageData}/>
                                        <div className="col footer-col-information col-md-3 col-2 col-mob-12">
                                            <FooterInformation pageData={pageData}/>
                                        </div>

                                        <div
                                            className="col footer-col-nav col-4 col-md-12 col-mob-12 footer-newsletter-col">
                                            <FooterNewsletter/>
                                            <SocialIcons pageData={pageData}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-copyright-section">
                <FooterCopyright pageData={pageData}/>
            </div>
        </footer>
    );
};
export default Footer;

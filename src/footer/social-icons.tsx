import { Fragment } from 'react';
import ExpLinkParser from '../cms-utils/link-parser';
import { IconInsta } from '../assets/icons/insta';
import { IconTwitter } from '../assets/icons/twitter';
import { IconFacebook } from '../assets/icons/facebook';
import { IconLinkedin } from '../assets/icons/linkedin';
import { IconPinterest } from '../assets/icons/pintrest';
import { IconTiktok } from '../assets/icons/icon-tiktok';
import { IconYoutube } from '../assets/icons/icon-youtube';

interface SocialIconsProps {
  pageData: {
    globalSettings: {
      social_links_com: any[];
    };
  };
}

const socialList = [
  {
    socialMedia: 'Facebook',
    socialLink: 'facebook_link_et',
    icons: IconFacebook,
  },
  {
    socialMedia: 'Twitter',
    socialLink: 'twitter_link_et',
    icons: IconTwitter,
  },
  {
    socialMedia: 'Instagram',
    socialLink: 'instagram_link_et',
    icons: IconInsta,
  },
  {
    socialMedia: 'Linkedin',
    socialLink: 'linkedin_link_et',
    icons: IconLinkedin,
  },
  {
    socialMedia: 'Pinterest',
    socialLink: 'pinterest_link_et',
    icons: IconPinterest,
  },
  {
    socialMedia: 'TickTock',
    socialLink: 'tiktok_link_et',
    icons: IconTiktok,
  },
  {
    socialMedia: 'youtube',
    socialLink: 'youtube_link_et',
    icons: IconYoutube,
  },
];

const SocialIcons = ({ pageData }: SocialIconsProps) => {
  return (
    <>
      <div className="social-icons">
        <h6>Follow US</h6>
        <ul className="social-icon-list">
          {socialList.map((item, index) => {
            return (
              <Fragment key={index}>
                {pageData.globalSettings?.social_links_com?.length &&
                  pageData.globalSettings?.social_links_com[0][
                    item.socialLink
                  ] && (
                    <li>
                      <ExpLinkParser
                        title={`${item.socialMedia}`}
                        ariaLabel={`${item.socialMedia}`}
                        to={`${
                          pageData.globalSettings?.social_links_com?.length &&
                          pageData.globalSettings?.social_links_com[0][
                            item.socialLink
                          ]
                        }`}
                        target="_blank"
                        className="icon">
                        <item.icons />
                      </ExpLinkParser>
                    </li>
                  )}
              </Fragment>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SocialIcons;

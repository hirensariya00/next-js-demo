import ExpLinkParser from '../cms-utils/link-parser';


const FooterInformation = ({ pageData }: any) => {

  return (
    <div className="footer-information">


      <h6 className="footer-title">Locate US</h6>
      <div className="footer-contact-info">
        <div className="info-item footer-address">
          <p
            dangerouslySetInnerHTML={{
              __html:
                pageData.globalSettings?.site_com?.length &&
                pageData.globalSettings?.site_com[0].address_et,
            }}
          />
        </div>

        <div className="info-item footer-call">
          <ExpLinkParser
            to={`tel:${
              pageData.globalSettings?.site_com?.length &&
              pageData.globalSettings?.site_com[0].phone_et
            }`}
            dangerouslySetInnerHTML={{
              __html:
                pageData.globalSettings?.site_com?.length &&
                pageData.globalSettings?.site_com[0].phone_et,
            }}
          />
        </div>

        <div className="info-item">
          <ExpLinkParser
            to={`mailto:${
              pageData.globalSettings?.site_com?.length &&
              pageData.globalSettings?.site_com[0].email_et
            }`}
            dangerouslySetInnerHTML={{
              __html:
                pageData.globalSettings?.site_com?.length &&
                pageData.globalSettings?.site_com[0].email_et,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FooterInformation;

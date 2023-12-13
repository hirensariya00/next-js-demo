import ExpMenu from '../menu/menu';

const FooterQuickLinks = ({ pageData }: any) => {
  const toggleMenu = (event: any) => {
    if (
      event.currentTarget.parentElement?.parentElement?.classList.contains(
        'is-expanded'
      )
    ) {
      event.currentTarget.parentElement?.parentElement.classList.remove(
        'is-expanded'
      );
    } else {
      event.currentTarget.parentElement?.parentElement.classList.add(
        'is-expanded'
      );
    }
  };

  return (
    <>
      <div className="col footer-col-nav col-2 col-md-3 col-mob-12">
        <div className="footer-nav">
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <h6
            className="footer-title footer-toggle-title"
            onClick={(event) => toggleMenu(event)}>
            {pageData.globalSettings?.footer_com &&
              pageData.globalSettings?.footer_com[0]?.column_1_title_et}
          </h6>
          <ExpMenu
            menuLinkObj={pageData.globalSettings?.footer_com}
            keyValueForMenu={'column_1_navigation_id_et'}
            ulClasses={'footer-nav-list'}
            liClasses={''}
            linkNameClasses={''}
          />
        </div>
      </div>

      <div className="col footer-col-nav col-2 col-md-3 col-mob-12">
        <div className="footer-nav">
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <h6
            className="footer-title footer-toggle-title"
            onClick={(event) => toggleMenu(event)}>
            {pageData.globalSettings?.footer_com &&
              pageData.globalSettings?.footer_com[0]?.column_2_title_et}
          </h6>
          <ExpMenu
            menuLinkObj={pageData.globalSettings?.footer_com}
            keyValueForMenu={'column_2_navigation_id_et'}
            ulClasses={'footer-nav-list'}
            liClasses={''}
            linkNameClasses={''}
          />
        </div>
      </div>

      <div className="col footer-col-nav col-2 col-md-3 col-mob-12">
        <div className="footer-nav">
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <h6
            className="footer-title footer-toggle-title"
            onClick={(event) => toggleMenu(event)}>
            {pageData.globalSettings?.footer_com &&
              pageData.globalSettings?.footer_com[0]?.column_3_title_et}
          </h6>
          <ExpMenu
            menuLinkObj={pageData.globalSettings?.footer_com}
            keyValueForMenu={'column_3_navigation_id_et'}
            ulClasses={'footer-nav-list'}
            liClasses={''}
            linkNameClasses={''}
          />
        </div>
      </div>
    </>
  );
};

export default FooterQuickLinks;

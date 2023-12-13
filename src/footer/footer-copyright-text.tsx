const FooterCopyrightText = ({ pageData }: any) => {
  return (
    <div className="col col-8 col-mob-12 copy-right-text">
      <p
        dangerouslySetInnerHTML={{
          __html:
            pageData.globalSettings?.footer_com &&
            pageData.globalSettings?.footer_com[0]?.copyright_text_et,
        }}
      />
    </div>
  );
};

export default FooterCopyrightText;

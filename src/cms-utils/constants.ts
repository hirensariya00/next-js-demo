//@ts-nocheck
const expDataSourceConstants = {
  CONTENT_LIBRARY: 'contentLibrary',
  FREE_FORM: 'freeForm',
};

const expWidgetConstants = {
  WIDGET_CHECK_TRUE: 'on',
  WIDGET_CHECK_FALSE: 'off',
};

const expBasicTraitConstants = {
  CHECKBOX: 'checkbox',
  COLOR_PICKER: 'color-picker',
  HTML_INPUT: 'rich-text-editor',
  IMAGE: 'image-selector',
  NUMBER: 'number',
  SELECT: 'select',
  TEXT: 'text',
  TEXT_AREA: 'text-area',
};

const expCustomTraitConstants = {
  BANNER_WITH_IMAGE: 'banner-with-image',
  TITLE_SECTION_LAYOUT_2: 'title-section-layout-2',
  BLOG_CARD: 'blog-card',
  CONTENT_LIBRARY: 'contentLibrary',
  CTA_BANNER: 'cta-banner-demo-theme',
  EXP_CTA_BANNER: 'exp-cta-banner',
  HERO_BANNER: 'hero-banner',
  LANDING_BANNER: 'landing-banner',
  PRODUCT_CARD_WIT_TITLE_IMAGE: 'product-card-with-title-image',
  SMALL_TWO_COL_BANNER: 'small-two-col-banner',
  TITLE_SECTION: 'title-section',
  TWO_COL_INFO_LAYOUT_1: 'two-col-info-layout-1',
  PRODUCT_CARD: 'product-card',
  ZIG_ZAG_LAYOUT: 'zig-zag-banner',
  FIRST_TRAIT:'first_trait',
};

const expContentAlignmentOptions = [
  { name: 'Left', value: 'justify-left' },
  { name: 'Center', value: 'justify-center' },
  { name: 'Right', value: 'justify-right' },
];

const expTextAlignmentOptions = [
  { name: 'Left', value: 'text-left' },
  { name: 'Center', value: 'text-center' },
  { name: 'Right', value: 'text-right' },
];

const expHeaderOptions = [
  { name: 'Heading 1', value: 'h1' },
  { name: 'Heading 2', value: 'h2' },
  { name: 'Heading 3', value: 'h3' },
  { name: 'Heading 4', value: 'h4' },
  { name: 'Heading 5', value: 'h5' },
  { name: 'Heading 6', value: 'h6' },
];

export {
  expDataSourceConstants,
  expWidgetConstants,
  expBasicTraitConstants,
  expCustomTraitConstants,
  expContentAlignmentOptions,
  expTextAlignmentOptions,
  expHeaderOptions,
};

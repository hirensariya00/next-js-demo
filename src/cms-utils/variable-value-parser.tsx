//@ts-nocheck
import { ContentService } from '../services/content-service';
import { expDataSourceConstants } from './constants';

/**
 * A custom component that parses and returns the variable value based on the data source.
 * @param dataSource - The data source for the variable.
 * @param text - The variable text.
 * @param altText- The alternative text to be used if the data source is FREE_FORM and the text is empty.
 * @returns Parsed variable value.
 */
const ExpVariableValueParser = ({
  dataSource,
  text,
  altText = 'Enter Here',
}: {
  dataSource: string;
  text: string;
  altText?: string;
}) => {
  const { CONTENT_LIBRARY, FREE_FORM } = expDataSourceConstants;
  if (dataSource === CONTENT_LIBRARY) {
    return ContentService.parseVariableValue(text ? text : '');
  } else if (dataSource === FREE_FORM) {
    return ContentService.parseVariableValue(
      // text ? text : IsCMSApp ? '' : altText
      text ? text : altText
    );
  } else {
    return '';
  }
};

export { ExpVariableValueParser };

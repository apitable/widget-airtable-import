import { FieldType, t } from '@apitable/widget-sdk';
import { Strings } from './utils/i18n';
import {
  ColumnAttachmentFilled,
  ColumnAutonumberFilled,
  AccountFilled,
  ColumnCheckboxFilled,
  ColumnLastmodifiedtimeFilled,
  ColumnTextFilled,
  ColumnCreatedbyFilled,
  ColumnCreatedtimeFilled,
  ColumnSingleFilled,
  ColumnCurrencyFilled,
  ColumnEmailFilled,
  ColumnFormulaFilled,
  ColumnPercentFilled,
  ColumnFigureFilled,
  ColumnMultipleFilled,
  ColumnUrlOutlined,
  ColumnLastmodifiedbyFilled,
  ColumnLongtextFilled,
  ColumnPhoneFilled,
  ColumnRatingFilled,
} from '@apitable/icons';
import React from 'react';
import { Box, colorVars } from '@apitable/components';

export const FieldIconMap = {
  [FieldType.Attachment]: ColumnAttachmentFilled,
  [FieldType.URL]: ColumnUrlOutlined,
  [FieldType.Email]: ColumnEmailFilled,
  [FieldType.Phone]: ColumnPhoneFilled,
  [FieldType.Checkbox]: ColumnCheckboxFilled,
  [FieldType.Rating]: ColumnRatingFilled,
  [FieldType.Member]: AccountFilled,
  [FieldType.Formula]: ColumnFormulaFilled,
  [FieldType.Currency]: ColumnCurrencyFilled,
  [FieldType.Percent]: ColumnPercentFilled,
  [FieldType.AutoNumber]: ColumnAutonumberFilled,
  [FieldType.CreatedTime]: ColumnCreatedtimeFilled,
  [FieldType.LastModifiedTime]: ColumnLastmodifiedtimeFilled,
  [FieldType.CreatedBy]: ColumnCreatedbyFilled,
  [FieldType.LastModifiedBy]: ColumnLastmodifiedbyFilled,
};

export const AIRTABLE_URL = 'https://api.airtable.com';

export const AIRTABLE_API_VERSION = 'v0';

export const FIELD_GROUPS = {
  boolean: [FieldType.Checkbox],
  number: [FieldType.Number, FieldType.Rating, FieldType.Currency, FieldType.Percent],
  array: [FieldType.MultiSelect, FieldType.Text, FieldType.SingleText],
  string: [FieldType.Text, FieldType.SingleText, FieldType.Email, FieldType.Phone, FieldType.URL, FieldType.Phone],
  attach: [FieldType.Attachment],
};

export const TYPE_OPTIONS = [
  {
    label: (
      <div>
        <Box margin="4px" as="span">
          <ColumnLongtextFilled color={colorVars.thirdLevelText} />
        </Box>
        {t(Strings.long_text)}
      </div>
    ),
    value: FieldType.Text,
  },
  {
    label: (
      <div>
        <Box margin="4px" as="span">
          <ColumnTextFilled color={colorVars.thirdLevelText} />
        </Box>
        {t(Strings.single_text)}
      </div>
    ),
    value: FieldType.SingleText,
  },
  {
    label: (
      <div>
        <Box margin="4px" as="span">
          <ColumnMultipleFilled color={colorVars.thirdLevelText} />
        </Box>
        {t(Strings.multi_select)}
      </div>
    ),
    value: FieldType.MultiSelect,
  },
  {
    label: (
      <div>
        <Box margin="4px" as="span">
          <ColumnSingleFilled color={colorVars.thirdLevelText} />
        </Box>
        {t(Strings.select)}
      </div>
    ),
    value: FieldType.SingleSelect,
  },
  {
    label: (
      <div>
        <Box margin="4px" as="span">
          <ColumnFigureFilled color={colorVars.thirdLevelText} />
        </Box>
        {t(Strings.number)}
      </div>
    ),
    value: FieldType.Number,
  },
  // {
  //   label: (
  //     <div>
  //       <Box margin="4px" as="span">
  //         <ColumnCalendarFilled color={colorVars.thirdLevelText}/>
  //       </Box>
  //       {t(Strings.date)}
  //     </div>
  //   ),
  //   value: FieldType.DateTime
  // },
  {
    label: (
      <div>
        <Box margin="4px" as="span">
          <ColumnUrlOutlined color={colorVars.thirdLevelText} />
        </Box>
        {t(Strings.url)}
      </div>
    ),
    value: FieldType.URL,
  },
  {
    label: (
      <div>
        <Box margin="4px" as="span">
          <ColumnEmailFilled color={colorVars.thirdLevelText} />
        </Box>
        {t(Strings.email)}
      </div>
    ),
    value: FieldType.Email,
  },
  {
    label: (
      <div>
        <Box margin="4px" as="span">
          <ColumnCheckboxFilled color={colorVars.thirdLevelText} />
        </Box>
        {t(Strings.checkbox)}
      </div>
    ),
    value: FieldType.Checkbox,
  },
  {
    label: (
      <div>
        <Box margin="4px" as="span">
          <ColumnRatingFilled color={colorVars.thirdLevelText} />
        </Box>
        {t(Strings.rate)}
      </div>
    ),
    value: FieldType.Rating,
  },
  {
    label: (
      <div>
        <Box margin="4px" as="span">
          <ColumnCurrencyFilled color={colorVars.thirdLevelText} />
        </Box>
        {t(Strings.currency)}
      </div>
    ),
    value: FieldType.Currency,
  },
  {
    label: (
      <div>
        <Box margin="4px" as="span">
          <ColumnPercentFilled color={colorVars.thirdLevelText} />
        </Box>
        {t(Strings.percent)}
      </div>
    ),
    value: FieldType.Percent,
  },
  {
    label: (
      <div>
        <Box margin="4px" as="span">
          <ColumnPhoneFilled color={colorVars.thirdLevelText} />
        </Box>
        {t(Strings.phone)}
      </div>
    ),
    value: FieldType.Phone,
  },
  {
    label: (
      <div>
        <Box margin="4px" as="span">
          <ColumnAttachmentFilled color={colorVars.thirdLevelText} />
        </Box>
        {t(Strings.attachment)}
      </div>
    ),
    value: FieldType.Attachment,
  },
];

export const MAX_FIELDS_LEN = 200;

export const MAX_FILE_SIZE = 10 * 1024 * 1024;

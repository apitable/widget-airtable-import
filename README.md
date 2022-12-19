# Widget `airtable-import`

Support for importing data from Airtable into APITable.


## Get Airtable API Key Configuration

1. How to get the API Key

You need Airtable API Key to get the data source, Airtable API Key can be obtained by referring to [Airtable's official documentation](https://support.airtable.com/hc/en-us/articles/219046777) or click directly to [Airtable Account](https://airtable.com/account) to get it.

2. How to get the Base ID

We need the corresponding Airtable Base ID to get the data source, Airtable Base ID can be obtained by clicking into [Airtable Rest API](https://airtable.com/api), first select the Base you want to import, then copy it from the INTRODUCTION page.

3. How to get the Table ID

We need the corresponding Airtable Table ID to get the data source, Airtable Table ID can be obtained by clicking into [Airtable Rest API](https://airtable.com/api) , first select the Table you want to import, and then get it from the introduction.

## Supported column types

- [x] Attachment
- [x] Single line text
- [x] Multi-line text
- [x] MultiSelect
- [x] Number
- [x] Rating. Default property icon is 'star'
- [x] Checkbox. Default icon is 'white_check_mark'
- [x] DateTime. Default format 'YYYY/MM/DD'
- [x] URL
- [x] Currency. The default property precision is 2 and symbol is '¥'
- [x] Percent. The default precision is 2
- [x] Phone
- [x] Email
- [x] SingleSelect
- [ ] Formula
- [ ] Member
- [ ] MagicLink
- [ ] MagicLookUp


import i18n from '@/i18n';

export const getThItems = () => [
  { id: 1, label: i18n.t('request_list:row') },
  { id: 2, label: i18n.t('request_list:design_Name') },
  { id: 3, label: i18n.t('transaction_list:transaction_date') },
  { id: 4, label: i18n.t('transaction_list:transaction_amount') },
  { id: 6, label: i18n.t('transaction_list:status') },
  { id: 7, label: i18n.t('transaction_list:name_recipient') },
];

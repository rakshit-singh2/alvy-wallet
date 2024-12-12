import React from 'react';
import { Button, Input } from 'antd';
// Translate 
import { useTranslation } from 'react-i18next';
// Translate
const ImportAccountView = ({ privateKey, setPrivateKey, importFromPrivateKey }) => {
	// Translate
	const { t, i18n } = useTranslation();
	const handleLanguageChange = (event) => {
	i18n.changeLanguage(event.target.value);
	};
	// Translate
  return (
    <>
      <Input value={privateKey} onChange={(e) => setPrivateKey(e.target.value)} placeholder={t('Private Key')}/>
      <Button onClick={importFromPrivateKey}> {t('Import Account')}</Button>
    </>
  );
};

export default ImportAccountView;

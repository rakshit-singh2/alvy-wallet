import React from 'react';
import QRCode from 'qrcode.react';
// Translate 
import { useTranslation } from 'react-i18next';
// Translate

const QRCodeGenerator = ({ walletAddress }) => {
	// Translate
	const { t, i18n } = useTranslation();
	const handleLanguageChange = (event) => {
	i18n.changeLanguage(event.target.value);
	};
	// Translate
    return (
        <div>
            <h3>{t('Scan to Send Funds')}</h3>
            <QRCode value={`ethereum:${walletAddress}`} size={128} />
        </div>
    );
};

export default QRCodeGenerator;

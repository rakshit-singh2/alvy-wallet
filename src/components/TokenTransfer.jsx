import React, { useState } from 'react'
import { Input, Modal, Spin, message } from "antd";
import { ethers, parseUnits } from "ethers";
import { useTranslation } from 'react-i18next';
import { getChain, getWalletData } from '../helpers/storage';
import { decryptData } from "../helpers/encryption";
import { Link } from 'react-router-dom';

const TokenTransfer = ({ selectedToken, sendModalVisible, setSendModalVisible, walletAddress, erc20ABI, provider, selectedChain }) => {

    const { t, i18n } = useTranslation();
    const handleLanguageChange = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [hash, setHash] = useState(null);
    const [hashLink, setHashLink] = useState(null);
    const [processing, setProcessing] = useState(null);

    const handleSendToken = async () => {
        try {
            setProcessing(true);
            const walletData = await getWalletData(walletAddress);
            const privateKey = await decryptData(walletData.walletKey);
            const wallet = new ethers.Wallet(privateKey, provider);
            const contract = new ethers.Contract(selectedToken.address, erc20ABI, wallet);
            const adjustedAmount = parseUnits(amount.toString(), selectedToken.decimals);
            const tx = await contract.transfer(recipient, adjustedAmount);
            const receipt = await tx.wait();
            const chainData = await getChain(selectedChain)
            console.log(receipt)
            setHashLink(chainData.blockExplorerUrl + '/tx/' + receipt.hash);
            setHash(receipt.blockHash);
        } catch (err) {
            setHash(null);
            message.error(`Transaction failed: ${err.shortMessage}`);
        } finally {
            setProcessing(false);
            setAmount("");
            setRecipient("")
        }
    };

    return (
        <Modal
            title={t('Send Token')}
            open={sendModalVisible}
            onCancel={() => setSendModalVisible(false)}
            onOk={hash ? () => {
                setSendModalVisible(false);
                setHashLink(null); 
                setHash(null);
            } : handleSendToken}
        >
            {processing ? <Spin size="large" /> : hash ?
                <>{t('Transaction Hash')}:<br /><Link to={hashLink} target="_blank" rel="noopener noreferrer">
                    {hash}
                </Link></> :
                <><Input
                    placeholder={t('Recipient Address')}
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />
                    <Input
                        placeholder={t('Amount')}
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={{ marginTop: "10px" }}
                    /></>
            }
        </Modal>
    )
}

export default TokenTransfer
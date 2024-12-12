import { Form, Input, Button, message } from 'antd';
import { editChain } from '../../helpers/storage';

// Translate 
import { useTranslation } from 'react-i18next';
// Translate
const EditChainForm = ({ fetchChainOptions, setEditChainView, setIsModalVisible, chainEdit, setChainEdit }) => {
// Translate
	const { t, i18n } = useTranslation();
	const handleLanguageChange = (event) => {
	i18n.changeLanguage(event.target.value);
	};
	// Translate
  const [form] = Form.useForm();

  const handleEditChain = async (values) => {
    try {
      await editChain(chainEdit.hex, values.name, values.ticker, values.blockExplorerUrl);
      setChainEdit(null)
      fetchChainOptions();
      message.success('Chain Edited successfully!');
    } catch (error) {
      message.error(`Unable to edit chain. Please verify RPC URL: ${error.message}`);
    } finally {
      setEditChainView(false);
      form.resetFields();
      setIsModalVisible(false);
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleEditChain}
      layout="vertical"
      style={{ maxHeight: 'calc(60vh - 50px)', overflowY: 'scroll', scrollbarWidth: 'none' }}
      initialValues={{
        name: chainEdit.name,
        ticker: chainEdit.ticker,
        blockExplorerUrl: chainEdit.blockExplorerUrl
      }}
    >
      <Form.Item
        name="name"
        label={t('Name')}
        rules={[{ required: true, message: 'Please enter the name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="ticker"
        label={t('Ticker')}
        rules={[{ required: true, message: 'Please enter the ticker' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="blockExplorerUrl"
        label={t('Block Explorer URL')}
        rules={[{ required: true, message: 'Please enter the Block Explorer URL' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          
		   {t('Edit Chain')}
        </Button>
      </Form.Item>
    </Form>

  );
};

export default EditChainForm;

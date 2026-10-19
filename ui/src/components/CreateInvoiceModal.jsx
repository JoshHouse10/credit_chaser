import { useState, useEffect } from 'react';
import {
  Modal,
  Select,
  TextInput,
  NumberInput,
  Button,
  ActionIcon,
  Group,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import classes from './css/CreateInvoiceModal.module.css';
import {fetchCustomers} from '../api/queries.js';

export default function CreateInvoiceModal({ opened, onClose, onSubmit }) {
    const [invoice, setInvoice] = useState({
        id:1,
        customer:null,
        currency:'GBP',
        documentDate:null,
        dueDate:null,
        vatRate:20.00,
        invoiceTotal:null,
        invoiceLines:[{
            id:null,
            description:null,
            quantity:null,
            sellingPrice:null
            }],
        })

  const [customers, setCustomers] = useState([]);
  const [activeTab, setActiveTab] = useState("header");

  const inputStyles = {
    label: { fontSize: 13, fontWeight: 600, color: 'var(--text-h)', marginBottom: 6 },
    input: {
      borderColor: 'var(--line-strong)',
      color: 'var(--text-h)',
      '&:focus': { borderColor: 'var(--paid)' },
      '&::placeholder': { color: 'var(--text-dim)' },
    },
  };

  const currencySymbols = {
      GBP:"£",
      EUR:"€",
      USD:"$",
      }

  useEffect(() => {
      const customers = async () => {

          const data = await fetchCustomers();
          if(data) {
              let sortedCustomers = data.sort((a, b) =>
                a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName)
              );
              setCustomers(sortedCustomers.map(cus => ({
                  value:String(cus.id),
                  label: `${cus.firstName} ${cus.lastName}`,
                  })))
              }
          }
      customers();
      }, [])

  const lineTotal = (line) => (Number(line.quantity) || 1) * (Number(line.sellingPrice) || 0);
  const updateHeaderTotal = (lines) => {
      let total = 0;
      for(let i = 0; i < lines.length; i++) {
          console.log('line:' + lines[i]);
          total += lineTotal(lines[i]) ?? 0;
          }
      setInvoice((current) => ({...current, invoiceTotal:total}))
      console.log(total);
      }


  const updateLine = (id, field, value) => {

      const newLines = invoice.invoiceLines.map((line) => (line.id === id ? {...line, [field]: value} : line));

      setInvoice((current) =>
      ({
          ...current,
          invoiceLines: newLines
          }));
      updateHeaderTotal(newLines);
      };

  const addLine = () => {
    setInvoice((current) => ({
        ...current,
        invoiceLines: [...current.invoiceLines,
            { id: (current.invoiceLines.at(-1)?.id ?? 0) + 1, description: '', quantity: '', sellingPrice: '' },]
        }));

  };

  const removeLine = (id) => {
     const newLines = invoice.invoiceLines.length > 1 ? invoice.invoiceLines.filter((line) => line.id !== id) : invoice.invoiceLines;
    setInvoice((current) => ({...current, invoiceLines:newLines}));
    updateHeaderTotal(newLines);

  };

  const handleSubmit = () => {
    onSubmit?.({
      customer,
      currency,
      documentDate,
      dueDate,
      invoiceTotal,
      lines,
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="lg"
      radius={12}
      overlayProps={{ backgroundOpacity: 0.45, blur: 2 }}
      withCloseButton={false}
      padding={0}
      classNames={{ content: classes.content, body: classes.body }}
    >
      <div className={classes.header}>
        <div>
          <p className={classes.eyebrow}>New receivable</p>
          <h2 className={classes.title}>Create invoice</h2>
        </div>
        <h3 className={classes.headerTotal}>{`${currencySymbols[invoice.currency]}${invoice.invoiceTotal <= 0 ? '0' : invoice.invoiceTotal}`}</h3>
      </div>
      {activeTab === 'header' && (
        <>
         <div className={classes.body}>
                 <div className={classes.section}>
                   <p className={classes.sectionLabel}>Customer</p>
                   <Select
                     aria-label="Customer"
                     placeholder="Select a customer"
                     searchable
                     data={customers}
                     value={invoice.customer}
                     onChange={(value) => setInvoice({...invoice, customer:value})}
                     comboboxProps={{ withinPortal: true }}
                     styles={inputStyles}
                   />
                 </div>

                 <hr className={classes.divider} />

                 <div className={classes.section}>
                   <p className={classes.sectionLabel}>Invoice details</p>

                   <div className={classes.row}>
                     <Select
                       label="Currency"
                       data={['GBP', 'EUR', 'USD']}
                       value={invoice.currency}
                       onChange={(value) => setInvoice({...invoice, currency:value})}
                       allowDeselect={false}
                       comboboxProps={{ withinPortal: true }}
                       styles={inputStyles}
                     />
                     <Select
                        label="Vat Rate (%)"
                        data={[20.00, 0.00]}
                        value={invoice.vatRate}
                        onChange={(value) => setInvoice({...invoice, vatRate:value})}
                        allowDeselect={false}
                        comboboxProps={{ withinPortal: true }}
                        styles={inputStyles}
                                                             />
                   </div>

                   <div className={classes.row}>
                     <DateInput
                       label="Document date"
                       placeholder="Select date"
                       valueFormat="DD MMM YYYY"
                       clearable
                       value={invoice.documentDate}
                       onChange={(value) => setInvoice({...invoice, documentDate:value})}
                       popoverProps={{ withinPortal: true }}
                       styles={inputStyles}
                     />
                     <DateInput
                       label="Due date"
                       placeholder="Select date"
                       valueFormat="DD MMM YYYY"
                       clearable
                       value={invoice.dueDate}
                       onChange={(value) => setInvoice({...invoice, dueDate:value})}
                       popoverProps={{ withinPortal: true }}
                       styles={inputStyles}
                     />
                   </div>
                 </div>
               </div>

               <div className={classes.footer}>
                 <Button variant="subtle" color="gray" onClick={onClose}>
                   Cancel
                 </Button>
                 <Button
                           color="jade"
                           leftSection={<IconPlus size={16} stroke={2} />}
                           onClick={() => setActiveTab('lines')}

                         >
                           Add Lines
                         </Button>
                 <Button
                   color="jade"
                   leftSection={<IconPlus size={16} stroke={2} />}
                   onClick={handleSubmit}
                 >
                   Create invoice
                 </Button>
               </div>
        </>
      )}

      {activeTab === 'lines' && (
        <>
          <div className={classes.body}>
            <div className={classes.section}>
              <p className={classes.sectionLabel}>Invoice lines</p>

              <div className={classes.lineItemsHeader}>
                <span>Description</span>
                <span>Quantity</span>
                <span>Selling price</span>
                <span>Line total</span>
                <span />
              </div>

              {invoice.invoiceLines.map((line) => (
                <div className={classes.lineItem} key={line.id}>
                  <TextInput
                    aria-label="Description"
                    placeholder="Description"
                    value={line.description}
                    onChange={(e) => updateLine(line.id, 'description', e.currentTarget.value)}
                    styles={inputStyles}
                  />
                  <NumberInput
                    aria-label="Quantity"
                    placeholder="Optional"
                    min={0}
                    hideControls
                    value={line.quantity}
                    onChange={(value) => updateLine(line.id, 'quantity', value)}
                    styles={inputStyles}
                  />
                  <NumberInput
                    aria-label="Selling price"
                    placeholder="0.00"
                    decimalScale={2}
                    fixedDecimalScale
                    thousandSeparator=","
                    hideControls
                    allowNegative={false}
                    prefix={currencySymbols[invoice.currency]}
                    value={line.sellingPrice}
                    onChange={(value) => updateLine(line.id, 'sellingPrice', value)}
                    styles={{
                      ...inputStyles,
                      input: { ...inputStyles.input, fontFamily: 'var(--mono)', letterSpacing: '-0.02em' },
                    }}
                  />
                  <p className={classes.lineTotal}>
                    {currencySymbols[invoice.currency]}
                    {lineTotal(line).toFixed(2)}
                  </p>
                  <ActionIcon
                    variant="subtle"
                    color="red"
                    aria-label="Remove line"
                    disabled={invoice.invoiceLines.length === 1}
                    onClick={() => removeLine(line.id)}
                  >
                    <IconTrash size={16} stroke={2} />
                  </ActionIcon>
                </div>
              ))}

              <Button
                variant="subtle"
                color="jade"
                leftSection={<IconPlus size={16} stroke={2} />}
                onClick={addLine}
                disabled={invoice.invoiceLines.filter((line) => !line.description).length > 0}
              >
                Add line
              </Button>
            </div>
          </div>

          <div className={classes.footer}>
            <Button variant="subtle" color="gray" onClick={() => setActiveTab('header')}>
              Back
            </Button>
            <Button color="jade" onClick={handleSubmit}>
              Create invoice
            </Button>
          </div>
        </>
      )}

    </Modal>
  );
}

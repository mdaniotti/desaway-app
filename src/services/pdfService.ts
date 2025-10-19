import RNPrint from 'react-native-print';
import {
  FormData,
  PickerOption,
  PDFService,
  PDFGenerationResult,
} from '../types';

const generateHTMLContent = (
  formData: FormData,
  pickerOptions: PickerOption[],
): string => {
  const { LOGO_BASE_64, FILE_BASE_64 } = require('../constants');

  const allData = [
    { label: 'Dato 1', value: formData.text || 'Ejemplo de texto' },
    { label: 'Dato 2', value: getOptionLabel(formData.option, pickerOptions) },
    { label: 'Dato 3', value: formData.numeric || '123' },
    // You can add more data here
  ];

  // Calculate number of pages (2 data per page)
  const itemsPerPage = 2;
  const totalPages = Math.ceil(allData.length / itemsPerPage);

  // Generate pages dynamically
  const generatePages = (): string => {
    let pagesHTML = '';

    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      const startIndex = pageIndex * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, allData.length);
      const pageData = allData.slice(startIndex, endIndex);

      pagesHTML += `
        <div class="page">
          <div class="header">
            <h1 class="title">Reporte de Datos</h1>
            <div class="separator"></div>
          </div>
          
          <div class="section-header">
            <div class="section-icon"><img src="${FILE_BASE_64}" alt="File Icon" /></div>
            <div class="section-content">
              <div class="section-title">Información del Reporte</div>
              ${pageData
                .map(
                  item =>
                    `<div class="data-item"><strong>${item.label}</strong>: ${item.value}</div>`,
                )
                .join('')}
            </div>
          </div>
          
          <div class="footer">
            <img src="${LOGO_BASE_64}" alt="Desaway Logo" />
            <div class="page-number">${pageIndex + 1}/${totalPages}</div>
          </div>
        </div>
      `;
    }

    return pagesHTML;
  };

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: Arial, sans-serif;
            background-color: white;
            color: #4A2C5A;
          }
          .page {
            width: 100%;
            height: 100vh;
            padding: 60px 80px;
            page-break-after: always;
            display: flex;
            flex-direction: column;
            position: relative;
          }
          .page:last-child {
            page-break-after: avoid;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .title {
            font-size: 40px;
            font-weight: 600;
            color: #4A2C5A;
            margin-bottom: 20px;
            font-style: semibold;
          }
          .separator {
            width: 80%;
            height: 2px;
            background-color: #4A2C5A;
            margin: 0 auto 25px auto;
          }
          .section-header {
            display: flex;
            margin-bottom: 30px;
            margin-left: 10%;
          }
          .section-icon {
            width: 53px;
            height: 66px;
            margin-right: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .section-icon img {
            width: 100%;
            height: 100%;
          }
          .section-content {
            display: flex;
            flex-direction: column;
            gap: 25px;
          }
          .section-title {
            font-size: 24px;
            font-weight: 600;
            font-style: bold;
            color: #4A2C5A;
          }
          .data-item {
            font-size: 20px;
            color: #4A2C5A;
          }
          .footer {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #4A2C5A;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .logo img {
            height: 50px;
          }
          .page-number {
            font-size: 12px;
            color: #999;
          }
        </style>
      </head>
      <body>
        ${generatePages()}
      </body>
    </html>
  `;
};

const getOptionLabel = (
  value: string,
  pickerOptions: PickerOption[],
): string => {
  const option = pickerOptions.find(option => option.value === value);
  return option ? option.label : 'No se seleccionó ninguna opción';
};

const generatePDF = async (
  formData: FormData,
  pickerOptions: PickerOption[],
): Promise<PDFGenerationResult> => {
  try {
    // Generate PDF
    const htmlContent = generateHTMLContent(formData, pickerOptions);

    const printOptions = {
      html: htmlContent,
      fileName: `desaway_${Date.now()}.pdf`,
    };

    await RNPrint.print(printOptions);

    return { success: true };
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF: ' + (error as Error).message);
  }
};

const pdfService: PDFService = {
  generatePDF,
};

export default pdfService;

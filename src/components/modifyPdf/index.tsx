import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { message } from 'antd';

export async function modifyPdf(url: any, texts: any) {
  message.success('正在处理，请稍等～');
  const text = `${texts}`;
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Courier);
  // 加载自定义字体
  const fontBytes = await fetch(
    'http://cdn.inlymedia.com/Alibaba-PuHuiTi-Bold.ttf',
  ).then((res) => res.arrayBuffer());
  // 自定义字体挂载
  pdfDoc.registerFontkit(fontkit);
  const customFont = await pdfDoc.embedFont(fontBytes);

  const page = pdfDoc.getPages();

  const firstPage = page[0];
  const { height, width } = firstPage.getSize();

  // 文字渲染配置
  const drawTextParams = {
    lineHeight: 50,
    font: customFont,
    size: 12,
    color: rgb(0.82, 0.86, 0.89),
    rotate: degrees(15),
    opacity: 0.5,
  };

  page.forEach((item: any) => {
    for (let ix = 10; ix < width; ix += 340) {
      // 水印横向间隔
      let lineNum = 0;
      for (let iy = 30; iy <= height; iy += 220) {
        // 水印纵向间隔
        lineNum++;
        item.drawText(text, {
          x: lineNum & 1 ? ix : ix + 70,
          y: iy,
          ...drawTextParams,
        });
      }
    }
  });
  let winNav: any = window.navigator;
  if (winNav && winNav.msSaveOrOpenBlob) {
    const blob = new Blob([await pdfDoc.save()], { type: 'application/pdf' });
    winNav.msSaveBlob(blob, '预览.pdf');
  } else {
    const pdfUrl = URL.createObjectURL(
      new Blob([await pdfDoc.save()], { type: 'application/pdf' }),
    );
    /**
     * 获取 blob
     * @param  {String} url 目标文件地址
     * @return {Promise}
     */
    function getBlob(url: string) {
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.responseType = 'blob';
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(xhr.response);
          }
        };

        xhr.send();
      });
    }

    /**
     * 保存
     * @param  {Blob} blob
     * @param  {String} filename 想要保存的文件名称
     */
    function saveAs(blob: any, filename: string) {
      let nav: any = window.navigator;
      if (nav.msSaveOrOpenBlob) {
        nav.msSaveBlob(blob, filename);
      } else {
        const link = document.createElement('a');
        const body: any = document.querySelector('body');

        link.href = window.URL.createObjectURL(blob);
        link.download = filename;

        // fix Firefox
        link.style.display = 'none';
        body.appendChild(link);

        link.click();
        body.removeChild(link);

        window.URL.revokeObjectURL(link.href);
      }
    }

    /**
     * 下载
     * @param  {String} url 目标文件地址
     * @param  {String} filename 想要保存的文件名称
     */
    function download(url: string, filename: string) {
      getBlob(url).then((blob) => {
        saveAs(blob, filename);
      });
    }
    download(pdfUrl, `${text}.pdf`);
    // window.open(pdfUrl, '_blank');
  }
  return '导出完成！';
}

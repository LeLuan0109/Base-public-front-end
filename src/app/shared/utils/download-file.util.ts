import * as FileSaver from 'file-saver';

export function seveExcel(data: any, fileName: string) {
  const file = new File([data], fileName + '.xlsx', {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  FileSaver.saveAs(file);
}


export const downloadFileExcel = (data: any, name: string) => {
  const uri = window.URL.createObjectURL(data);
  const downloadLink = document.createElement("a");
  downloadLink.href = uri;
  downloadLink.download = `${name}.xlsx`;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
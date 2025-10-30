
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
  document.getElementById('date').innerText = `Date: ${formattedDate}`;
  document.querySelectorAll('input, select').forEach(el => el.addEventListener('input', calculate));
});

function calculate() {
  const weight = parseFloat(document.getElementById('weight').value) || 0;
  const rate = parseFloat(document.getElementById('rate').value) || 0;
  const makingCharges = parseFloat(document.getElementById('makingCharges').value) || 0;

  const baseAmount = weight * rate;
  const making = (baseAmount * makingCharges) / 100;
  const subtotal = baseAmount + making;

  const sgstAmt = subtotal * 0.015;
  const cgstAmt = subtotal * 0.015;
  const total = subtotal + sgstAmt + cgstAmt;

  document.getElementById('baseAmount').innerText = `₹${baseAmount.toFixed(2)}`;
  document.getElementById('makingAmt').innerText = `₹${making.toFixed(2)}`;
  document.getElementById('subtotal').innerText = `₹${subtotal.toFixed(2)}`;
  document.getElementById('sgstAmt').innerText = `₹${sgstAmt.toFixed(2)}`;
  document.getElementById('cgstAmt').innerText = `₹${cgstAmt.toFixed(2)}`;
  document.getElementById('grandTotal').innerText = `₹${total.toFixed(2)}`;
  document.getElementById('total').innerText = `Total: ₹${total.toFixed(2)}`;
}

async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const billArea = document.getElementById('bill-area');
  const canvas = await html2canvas(billArea, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('JP_Jewellers_Bill.pdf');
}

function printBill() {
  const printContents = document.getElementById('bill-area').innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  location.reload();
}

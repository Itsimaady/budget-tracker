// Select form and inputs
const form = document.getElementById('expense-form');
const categoryInput = document.getElementById('category');
const amountInput = document.getElementById('amount');
const chartCanvas = document.getElementById('expense-chart');

// Initialize Chart.js dataset
const expenseData = {
  labels: [],
  datasets: [{
    label: 'Expenses',
    data: [],
    backgroundColor: [],
  }]
};

// Create Chart instance
const expenseChart = new Chart(chartCanvas, {
  type: 'pie',
  data: expenseData,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Your Expense Breakdown',
        font: {
          size: 18
        }
      }
    }
  }
});

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const category = categoryInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (category && !isNaN(amount) && amount > 0) {
    // Add to chart data
    expenseData.labels.push(category);
    expenseData.datasets[0].data.push(amount);
    expenseData.datasets[0].backgroundColor.push(generateColor());

    // Update chart
    expenseChart.update();

    // Reset form
    categoryInput.value = '';
    amountInput.value = '';
  }
});

// Generate pastel colors
function generateColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 70%)`;
}

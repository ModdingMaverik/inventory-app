const API_URL = "AKfycbyQkpS5BnfNRKhfoHG4c-PjCgJYWhrYvbPS_pwUJ9w";

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('inventory');
    let totalCost = 0;

    data.forEach(item => {
      const orderCost = parseFloat(item['Order Cost']) || 0;
      totalCost += orderCost;

      const row = document.createElement('div');
      row.innerHTML = `
        <strong>${item.Item}</strong> (${item.Unit})<br>
        Par: ${item.Par}, Current: 
        <input type="number" value="${item.Current}" onchange="updateItem('${item.Item}', this.value)">
        → To Order: ${item['To Order']} @ $${item['Cost per Unit']} = $${orderCost.toFixed(2)}
        <hr>
      `;
      container.appendChild(row);
    });

    const total = document.createElement('div');
    total.innerHTML = `<h2>Total Order Cost: $${totalCost.toFixed(2)}</h2>`;
    container.appendChild(total);
  });

function updateItem(item, current) {
  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ Item: item, Current: current }),
    headers: { "Content-Type": "application/json" }
  });
}

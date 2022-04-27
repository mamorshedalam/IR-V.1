const openSidebarBtn = document.getElementById('open-sidebar');
const closeSidebarBtn = document.getElementById('close-sidebar');
const openModelBtn = document.getElementById('open-model');
const closeModelBtn = document.getElementById('close-model');
const model = document.getElementById('model');
const form = document.getElementById('input-form');

fetch('assets/js/data.json')
     .then(res => res.json())
     .then(data => {
          dataArray = data.data;

          createSidebar(dataArray);

          dataArray.forEach(data => {
               const { company } = data;
               createInput('input-company', company);
          })
          dataArray.forEach(data => {
               const { department } = data;
               createInput('input-department', department);
          })
          dataArray.forEach(data => {
               const { warehouse } = data;
               createInput('input-store', warehouse);
          })
          dataArray.forEach(data => {
               const { requisitionType } = data;
               createInput('input-type', requisitionType);
          })
     });

const toggleDisplay = (show, hide, toggle) => {
     hide.style.display = 'none';
     show.style.display = 'block';
     document.getElementById('sidebar').style.display = toggle;
}

const createInput = (field, data) => {
     const inputSelect = document.getElementById(field);
     const inputOption = document.createElement('option');

     inputOption.innerText = data;
     inputOption.value = data;

     inputSelect.append(inputOption);
}
const createSidebar = (data) => {
     const sidebarTable = document.querySelector('#sidebar-table tbody');
     const field = sidebarTable.querySelector('.field');

     data.forEach(data => {
          const { code, department } = data;
          let newField = field.cloneNode(true);

          newField.children[0].innerText = sidebarTable.childElementCount - 1;
          newField.children[1].innerText = code;
          newField.children[2].innerText = department;

          sidebarTable.append(newField);
     })

}
const createCart = (code, item, rqQty, reason, rqDate, descrip) => {
     const cartTable = document.querySelector('#cart-table tbody');
     const field = cartTable.querySelector('.field');
     let newField = field.cloneNode(true);

     newField.setAttribute('name', code);
     newField.children[0].innerText = item;
     newField.children[1].innerText = rqQty;
     newField.children[2].innerText = reason;
     newField.children[3].innerText = rqDate;
     newField.children[4].innerText = descrip;

     cartTable.append(newField);
}
const createModel = (code, item, stock, uom, rqQty, reason, rqDate, descrip) => {
     const modelTable = document.querySelector('#model-table tbody');
     const field = modelTable.querySelector('.field');
     let newField = field.cloneNode(true);

     newField.setAttribute('name', code);
     fetch('assets/js/data.json')
          .then(res => res.json())
          .then(data => {
               dataArray = data.data;
               const getData = dataArray.find(data => data.code === code);

               newField.children[0].innerText = modelTable.childElementCount - 2;
               newField.children[1].innerText = getData.company;
               newField.children[2].innerText = getData.department;
               newField.children[3].innerText = getData.warehouse;
               newField.children[4].innerText = getData.requisitionType;
               newField.children[5].innerText = getData.requisitionDate;
               newField.children[6].innerText = getData.requestBy;
          })
     newField.children[7].innerText = item;
     newField.children[8].innerText = stock;
     newField.children[9].innerText = uom;
     newField.children[10].innerText = rqQty;
     newField.children[11].innerText = reason;
     newField.children[12].innerText = rqDate;
     newField.children[13].innerText = descrip;

     modelTable.append(newField);
}
const getData = () => {
     const code = form.getAttribute('name');
     const item = document.getElementById('item').value;
     const stock = document.getElementById('stock-qty').value;
     const uom = document.getElementById('uom').value;
     const rqQty = document.getElementById('req-qty').value;
     const reason = document.getElementById('reason').value;
     const rqDate = document.getElementById('req-date').value;
     const descrip = document.getElementById('descrip').value;

     createCart(code, item, rqQty, reason, rqDate, descrip);
     createModel(code, item, stock, uom, rqQty, reason, rqDate, descrip);
}

function fillForm(field) {
     const parentField = field.closest('.field');
     const itemCode = parentField.children[1].innerText;

     fetch('assets/js/data.json')
          .then(res => res.json())
          .then(data => {
               dataArray = data.data;
               const getData = dataArray.find(data => data.code === itemCode);

               form.setAttribute('name', getData.code);
               document.getElementById('input-company').value = getData.company;;
               document.getElementById('input-department').value = getData.department;
               document.getElementById('input-store').value = getData.warehouse;
               document.getElementById('input-type').value = getData.requisitionType;
               document.getElementById('input-date').value = getData.requisitionDate;
               document.getElementById('input-request').value = getData.requestBy;
          });
}
function deleteData(field) {
     const parentField = field.closest('.field');

     const code = parentField.getAttribute('name');
     const modelTable = document.querySelector('#model-table tbody').children;

     modelTable.namedItem(code).remove();
     parentField.remove();
}

openSidebarBtn.addEventListener('click', function (e) {
     toggleDisplay(closeSidebarBtn, openSidebarBtn, 'block');
})
closeSidebarBtn.addEventListener('click', function (e) {
     toggleDisplay(openSidebarBtn, closeSidebarBtn, 'none');
})
openModelBtn.addEventListener('click', function (e) {
     model.style.display = 'flex';
})
closeModelBtn.addEventListener('click', function (e) {
     model.style.display = 'none';
})
form.addEventListener('submit', function (e) {
     e.preventDefault();

     getData();
})
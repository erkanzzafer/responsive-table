const search = document.querySelector('.input-group input'),
    table_rows = document.querySelectorAll('tbody tr');
table_headings = document.querySelectorAll('thead th');

search.addEventListener("input", searchTable);
function searchTable() {
    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();
        // console.log(table_data.indexOf(search_data));
        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
        row.style.setProperty('--delay', i / 25 + 's');
        console.log("asd");
    })
    document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b'
    });
}

table_headings.forEach((head, i) => {
    //th lerin her birini head olarak döndürür i indeks.

    //varsayılan sıralama türü true yani asc
    let sort_asc = true;

    //th lerin her birini head olarak alır ve onclick özelleğine dinleyici ekler
    head.onclick = () => {
        table_headings.forEach((head) => head.classList.remove('active'));
        //dinleyiciye göre her bir th koduna tıklandığında aşağıdaki işlemler gerçekleşir.
    //hangi th ye tıklarsa tıklasın tüm thlerin active classı varsa remove a çevirir.

    //tıklanılan th nin classına active eklenir
        head.classList.add('active');

        //tüm tdler seçilir ve her birinin class remove edilir.
        document.querySelectorAll('td').forEach(td => td.classList.remove('active'));


        //tıklanılan th nin altındaki sütunlarda bulunan td ler active edilir.
        table_rows.forEach(row => {
            row.querySelectorAll('td')[i].classList.add('active');
        })

        //tıklanılan th ye asc ekler veya kaldırır
        head.classList.toggle('asc', sort_asc)

        //asc kaldırılmışsa true, yoksa false ekler
        sort_asc = head.classList.contains('asc') ? false : true;


        //ilgili sütun ve sıralama yönü gönderilir.
        sortable(i,sort_asc);
    }
})


function sortable(column,sort_asc){
     [...table_rows].sort((a,b)=>{
        let first_row=a.querySelectorAll('td')[column].textContent.toLowerCase(),
         second_row=b.querySelectorAll('td')[column].textContent.toLowerCase();
         return sort_asc ? (first_row < second_row ? -1 : 1) : (first_row < second_row ? 1 : -1);
     }).map(sorted_row=>document.querySelector('tbody').appendChild(sorted_row))
}


//Coverting HTML Table to PDF

const toPDF=function(customers_table){
    const html_code= `
    <link rel="stylesheet" href="style.css">
    <main class="table" > ${customers_table.innerHTML}</main>
    `;
    const new_window = window.open('','','width=500, height=600, top=0');
    new_window.document.write(html_code);
    setTimeout(()=>{
    new_window.print();
    new_window.close();
    },200);
}


const pdf_btn=document.querySelector('#toPDF');
const customers_table=document.querySelector('#customers_table');
pdf_btn.onclick=()=>{
    toPDF(customers_table);
}

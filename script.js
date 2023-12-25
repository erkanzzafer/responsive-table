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





const customers_table=document.querySelector('#customers_table');
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
pdf_btn.onclick=()=>{
    toPDF(customers_table);
}


//Coverting HTML Table to JSON
const toJSON=function(table){
    let table_data=[],
        t_head=[],

        t_headings = table.querySelectorAll('th'),
        t_rows=table.querySelectorAll('tbody tr');      
        for (let t_heading of t_headings){
          //  console.log(t_heading.textContent.trim().split(' '));
            //let actual_head=t_heading.textContent.trim().split(' ');
            let actual_head=t_heading.textContent.trim();
            t_head.push(actual_head.substr(0,actual_head.length-1).trim().toLowerCase());
        }  
        //console.log(t_head);
        t_rows.forEach(row=>{
            const row_object={},
                t_cells=row.querySelectorAll('td');

                t_cells.forEach((t_cell,cell_i)=>{
                    const img=t_cell.querySelector('img');
                    if(img){
                        row_object['customer image'] =  decodeURIComponent(img.src);
                    }
                    row_object[t_head[cell_i]]=t_cell.textContent.trim();

                });
                 //console.log(row_object);
                table_data.push(row_object);
        })
            //console.log(JSON.stringify(table_data,null,4));
        return JSON.stringify(table_data,null,4);
}




const json_btn = document.querySelector('#toJSON');
json_btn.onclick=()=>{
    const json=toJSON(customers_table);
    downloadFile(json,'customers_order.json');
}

const downloadFile=function(text,fileName){
    const a =document.createElement('a');
    a.download=fileName;

    a.href=`
    data:application/json;charset=utf-8,${encodeURIComponent(text)}
    `;
    document.body.appendChild(a);
    a.click();
    a.remove();

}
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excelsheet',
  templateUrl: './excelsheet.component.html',
  styleUrls: ['./excelsheet.component.css']
})
export class ExcelsheetComponent implements OnInit {

  data: [][] = [];
  datacb : [] = [];
  rapportdata : [] = [];
  rapportdatacb2 : [] = [];
  count : 0 = 0;
  rapportString : String = "";
  constructor() { }

  ngOnInit(): void {
    this.demo = this.demo[0]
  }
  onFileChange(evt: any) {
    const target : DataTransfer =  <DataTransfer>(evt.target);
    
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname : string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

     // console.log(ws);

      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));

      //console.log(this.data);

      let x = this.data.slice(1);
      //console.log(x);

      //Fill up the comboBox's
        for(let d in this.data[0]) // Target in the first index of data variable 'data[0] = first row'
        {
          this.datacb[d] = this.data[0][d]; // => loop over the data in the array in first row [0][d] => 'd' gonna increment 
        }

        
      //Fill up the comboBox's
      for(let d in this.data[0]) // Target in the first index of data variable 'data[0] = first row'
      {
        this.rapportdata[d] = this.data[0][d]; // => loop over the data in the array in first row [0][d] => 'd' gonna increment 
      }
    };

    reader.readAsBinaryString(target.files[0]);
  }

  downloadFile(evt: any) {
    const data = this.data;
    const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    const csv = data.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');
  
    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
  
    a.href = url;
    a.download = 'myFile.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
  name = 'Angular';
  demo;
  demo1;

  Swap(data,demo,demo1)
  {
    const temp = data[demo]; // variable temp
    data[demo] = data[demo1];
    data[demo1] = temp;
  }


  onSwap(demo,demo1)
  {
    this.data.forEach(data=> { // loop on JSON
      for(let d in data){ // loop on array
        
        if(d == (demo)) // d == index
        {
          console.log(d)
          this.Swap(data,demo,demo1) // data == array 
          //Fill up the comboBox's again tp syncho the data
          this.datacb = [];
          for(let d in this.data[0]) // Target in the first index of data variable 'data[0] = first row'
          {
            this.datacb[d] = this.data[0][d]; // => loop over the data in the array in first row [0][d] => 'd' gonna increment 
          }
        }
      }
    });
  }

  rapport;
  rapport1;

  getIndex(value : string)
  {
    for(let d in this.data[0])
    {
      if (value == this.data[0][d])
        return d;
    }
    return 0;
  }
  FillUpData(value : string)
  {
    let count = 0;
    this.rapportdatacb2 = [];
    this.data.forEach(data=>{
      count++;
      for (let d in data)
      {
        if(d == this.getIndex(value) && count > 1)
          this.rapportdatacb2.push(data[d]);
      }
    })
  }

  Counter(value : any, evt :any)
  {
    this.count = 0;
    let counter = 0;
    for(let i in this.rapportdatacb2)
    {
      if(this.rapportdatacb2[value] == this.rapportdatacb2[i])
      {
        this.count++;
        this.rapportString = "Colonne "+ this.rapport  +" , cellule " +this.rapportdatacb2[this.rapport1] + " repeated : "+ this.count;
      }
    }
    console.log(counter)
    this.downloadtxt(evt);
  }

  downloadtxt(evt: any) {
    const data = this.data;
    const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    const csv = this.rapportString;
    //unshift(header.join(','));
    //const csvArray = csv.join('\r\n');
    const str2blob = txt => new Blob([txt]);

  console.log(str2blob(this.rapportString))
    const a = document.createElement('a');
    const blob = str2blob(this.rapportString)
    console.log(blob)
    const url = window.URL.createObjectURL(blob);
  
    a.href = url;
    a.download = 'myFile.txt';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  
  words;



}


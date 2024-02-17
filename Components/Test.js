'use client'
import React, { useEffect } from 'react';
import { Page, Text, View, Document,Image, StyleSheet,PDFDownloadLink  } from '@react-pdf/renderer';

// Create styles

const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      padding: 20
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20
    },
    headerLeft: {
      width: '40%'
    },
    headerRight: {
      width: '30%',
      textAlign: 'left',
      margin: '10px',
      marginTop:'50px'
    },
    logo: {
      width: '80%',
      height: 150,
      marginBottom: 10
    },
    tableContainer: {
    flexDirection: 'column',
      marginBottom: 20,
      width: '100%' 
    },
    tableRow: {
      flexDirection: 'row',
      borderColor: '#000',
      alignItems: 'center',
      width: '100%' 

    },
    tableCell: {
      border: 1,
      borderColor: '#000',
      padding:10,
      width: '100%' 

    },
    tableHeader: {
      fontWeight: 'bold'
    },
    headertext:{
        fontSize:'15px',
        fontWeight:'heavy',
        textTransform:"uppercase",
        marginBottom:'5px'
    },subheadertext:{
        fontSize:'7px'
    },subheader:{
        fontSize:'8px',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    cente:{
        fontSize:'10px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        textAlign:'center',
        marginBottom: 10

    }
  });
  const  datefunc=(date)=>
  {
    const dateObject = new Date(date);
    const formattedDatee = `${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject.getDate().toString().padStart(2, '0')}/${dateObject.getFullYear()}`;

  return formattedDatee
  }
  const MyDocument = ({income,expense,name,devir,startdate,enddate}) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image style={styles.logo} src="ABG.png" />
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headertext}>ABG SİGORTA</Text>
            <Text style={styles.subheadertext}>Kuruköprü Mah. İnönü Cad. Aziz Pamukcu</Text>
            <Text style={styles.subheadertext}>İş Hanı Kat:3 No:63 Daire No:31 Seyhan / ADANA</Text>
            <Text style={styles.subheadertext}>Tel: 0850 840 0 224 - 0322 911 0707-0808</Text>
            <Text style={styles.subheadertext}>Gsm:0542 475 55 25</Text>
            <Text style={styles.subheadertext}>www.abgsigorta.com.tr - info@abgsigorta.com.tr</Text>
          </View>
        </View>
        <View style={styles.cente}>
            <Text >
                BORÇ/ALACAK MUTABAKAT EKSTRESİ
            </Text>
        </View>
        
        <View style={styles.subheader} >
            <Text >
                Kasa Adı = {name}
            </Text>
            <Text >
                Devir = {devir}
            </Text>
            <Text >
                {startdate} - {enddate}
            </Text>            
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.tableHeader]}>Tarih</Text>
            <Text style={[styles.tableCell, styles.tableHeader]}>Açıklama</Text>
            <Text style={[styles.tableCell, styles.tableHeader]}>Alacak</Text>
            <Text style={[styles.tableCell, styles.tableHeader]}>Borç</Text>
          </View>
          {expense.map(item => (
            <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{ datefunc(item.date)}</Text>
                <Text style={styles.tableCell}>{item.description}</Text>
                <Text style={styles.tableCell}>TL 0</Text>
                <Text style={styles.tableCell}>TL {item.amount.toFixed(2)}</Text>
            </View>
        ))}
          {income.map(item => (
            <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{ datefunc(item.date)}</Text>
                <Text style={styles.tableCell}>{item.description}</Text>
                <Text style={styles.tableCell}>TL {item.amount.toFixed(2)}</Text>
                <Text style={styles.tableCell}>TL 0</Text>
            </View>
        ))}

        </View>
        <View style={styles.section}>
          <Text>Additional Content</Text>
        </View>
      </Page>
    </Document>
  );

const PrintPdf = ({income,expense,name,devir,startdate,enddate}) => {
  useEffect(()=>
	{
    console.log("its works")
    
   }, []);
  return (
    <>
      <>
      <PDFDownloadLink className='qwew' document={<MyDocument 
      income={income} 
      expense={expense} 
      name={name} 
      devir={devir} 
      startdate={startdate}
       enddate={enddate}/>} 
       fileName="example.pdf">
        {({ blob, url, loading, error }) => ( 'indir')}
      </PDFDownloadLink>
    </>
    </>
  );
};

export default PrintPdf;

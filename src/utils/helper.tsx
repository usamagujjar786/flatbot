export const scratch_data = async (html: any, url: any) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const title = doc.getElementById('sliderTopTitle')?.innerText?.trim();
  const classes1 = doc.getElementsByClassName('headline headline-key-facts')
  // const tables = doc.getElementsByClassName('table')

  let freeFrom = doc.querySelector('div > h3.headline.headline-detailed-view-panel-title + p')?.innerHTML?.split('<br>')[0]?.replace('<b>', '')?.replace('</b>', '')?.replace(/\s+/g, ' ')?.trim();
  let freeTo = doc.querySelector('div > h3.headline.headline-detailed-view-panel-title + p')?.innerHTML?.split('<br>')[2] ? doc.querySelector('div > h3.headline.headline-detailed-view-panel-title + p')?.innerHTML?.split('<br>')[1]?.replace('<b>', '')?.replace('</b>', '')?.replace(/\s+/g, ' ')?.trim() : '';
  let online = doc.querySelector('div > h3.headline.headline-detailed-view-panel-title + p')?.innerHTML?.split('<br>')[2] ? doc.querySelector('div > h3.headline.headline-detailed-view-panel-title + p')?.innerHTML?.split('<br>')[2]?.replace('<b>', '')?.replace('</b>', '')?.replace(/\s+/g, ' ')?.trim() : doc.querySelector('div > h3.headline.headline-detailed-view-panel-title + p')?.innerHTML?.split('<br>')[1]?.replace('<b>', '')?.replace('</b>', '')?.replace(/\s+/g, ' ')?.trim();
  if (online) {
    online = online?.slice((online.indexOf('Online: ') + 'Online: '.length), online.length)
  }
  const address = doc.querySelector('div > h3.headline.headline-detailed-view-panel-title + a')?.innerHTML?.replaceAll('<br>', '')?.replace(/\s+/g, ' ')?.trim();
  //  Description
  const desc = doc.getElementById('ad_description_text');
  const child1 = desc?.querySelector("#infobox_nachrichtsenden");
  if (child1) {
    desc?.removeChild(child1)
  }
  const child2 = desc?.querySelector("#copy_asset_description");
  if (child2) {
    desc?.removeChild(child2)
  }

  // const myButton = doc.getElementById('copy_asset_description')
  // myButton?.click()
  // console.log('desc', desc?.textContent)

  var description: any = desc?.innerText?.replace(/\s+/g, ' ')?.trim()
  const startingIndex: number = description?.indexOf('googletag.cmd.push')
  const endingIndex: number = description?.indexOf('); });')
  if (startingIndex && endingIndex && endingIndex > startingIndex) {
    var first: any = description?.slice(0, startingIndex)
    var second: any = description?.slice(endingIndex + '); });'.length)
    if (first && second) {
      description = first + second
    }
  }
  // Extract size and rent values
  const size = classes1[0]?.innerHTML?.trim();
  const rent = classes1[2]?.innerHTML?.trim();

  // NEW WORK /////////////////////////////
  let contact_info: any = doc.querySelector('div.bottom_contact_box')
  let imageUrl: any = contact_info.querySelector('img.vis')?.src?.split('/t_ph.html?')[1]
  imageUrl = 'https://www.wg-gesucht.de' + '/t_ph.html?' + imageUrl

  let conatct_info_text: any = contact_info?.textContent?.trim()
  const anzeigeNummerRegex = /Anzeigennummer\s+(\d+)/;
  const mitgliedSeitRegex = /Mitglied seit\s+([A-Za-z]+ \d+)/;

  const anzeigeNummer = conatct_info_text.match(anzeigeNummerRegex);
  const mitgliedSeit = conatct_info_text.match(mitgliedSeitRegex);
  console.log(imageUrl)


  // console.log(conatct_info_text?.split( (conatct_info_text.indexOf('Mitglied seit ')+'Mitglied seit '.length ) ))
  // var text = OCRAD(imageUrl);
  // console.log('text',text)
  // ReadText(imageUrl).then((text: string) => {
  //   console.log(text);
  // }).catch((err: any) => {
  //   console.log(err);
  // })
  // const worker = await createWorker({
  //   workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@v4.0.3/dist/worker.min.js',
  //   langPath: 'https://tessdata.projectnaptha.com/4.0.0',
  //   corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@v4.0.3',
  // });
  // await worker?.load();
  // await worker?.loadLanguage('eng');
  // await worker?.initialize('eng');
  // const { data: { text } } = await worker?.recognize(imageUrl);
  // console.log('name', text);
  // await worker?.terminate();

  // Tesseract.recognize(imageUrl)
  //   .then(result => {
  //     // Extract the recognized text
  //     const extractedText = result.data.text;

  //     // Process the extracted text to find the name

  //     console.log(extractedText);
  //   })
  //   .catch(error => {
  //     console.error("Error performing OCR:", error);
  //   });
  const body = doc.getElementsByTagName('tbody')
  let discount = body[0].innerText?.replace(/\s+/g, ' ')?.trim()?.replace('Nebenkosten sind geschätzte Kosten, die auf dem Verbrauch des Vormieters basieren und monatlich im Voraus bezahlt werden. Am Jahresende rechnet der Vermieter die Vorauszahlungen mit dem tatsächlichen Verbrauch des Mieters ab. Infolgedessen muss der Mieter eine Nachzahlung leisten oder er erhält eine Rückzahlung.', '')
  const actualRent = discount.slice((discount.indexOf('Miete: ') + 'Miete: '.length),
    discount.indexOf('Nebenkosten: ')).trim()
  const extraCost = discount.slice((discount.indexOf('Nebenkosten: ') + 'Nebenkosten: '.length),
    discount.indexOf('Sonstige Kosten: ')).trim()
  let endIndex: number = discount.indexOf('Kaution: ')
  let deposit = 'n.a'
  if (endIndex === -1) {
    endIndex = discount.indexOf('SCHUFA-Auskunft: ')
  } else {
    deposit = discount.slice((discount.indexOf('Kaution: ') + 'Kaution: '.length),
      discount.indexOf('SCHUFA-Auskunft: ')).trim()
  }
  const otherCost = discount.slice((discount.indexOf('Sonstige Kosten: ') + 'Sonstige Kosten: '.length),
    endIndex).trim()
  let features = doc.querySelector('div > h3.headline.headline-detailed-view-panel-title + div.row')?.textContent?.match(/[^\s][^\n]*[^\s]/g)
  let contact = doc.querySelector('div.row.bottom_contact_box');
  let data: object = {
    url,
    title,
    size,
    rent,
    address,
    free_from: freeFrom,
    free_until: freeTo,
    description,
    actual_rent: actualRent,
    extra_cost: extraCost,
    other_cost: otherCost,
    online,
    features,
    deposit,
    ad_number: anzeigeNummer[1] ? anzeigeNummer[1] : '',
    member_since: mitgliedSeit[1] ? mitgliedSeit[1] : '',
    owner_name: imageUrl
  }

  return data
}
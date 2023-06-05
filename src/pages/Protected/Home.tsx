import '../../popup/Popup.css'
import Button from 'react-bootstrap/Button';
const Home = () => {
    async function fetchHTML(url: any) {
        try {
            const response = await fetch(url);
            const html = await response.text();
            return html;
        } catch (error) {
            console.error('Error fetching HTML:', error);
            return null;
        }
    }
    const validateURL = (url: string): boolean => {
        const myWebsite = "https://www.wg-gesucht.de/"
        if (!url.includes(myWebsite)) {
            return false
        } else {
            return true
        }
    }
    const myFun = () => {
        var queryInfo: any = {
            active: true,
            currentWindow: true
        };
        chrome.tabs.query(queryInfo, (tabs: any) => {
            var tab = tabs[0];
            var url = tab.url;
            let validate = validateURL(url)
            if (validate) {
                fetchHTML(url)
                    .then(html => {
                        if (html) {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, 'text/html');
                            const title = doc.getElementById('sliderTopTitle')?.innerText?.trim();
                            const classes1 = doc.getElementsByClassName('headline headline-key-facts')
                            // const tables = doc.getElementsByClassName('table')

                            let freeFrom = doc.querySelector('div > h3.headline.headline-detailed-view-panel-title + p')?.innerHTML?.split('<br>')[0]?.replace('<b>', '')?.replace('</b>', '')?.replace(/\s+/g, ' ')?.trim();
                            let freeTo = doc.querySelector('div > h3.headline.headline-detailed-view-panel-title + p')?.innerHTML?.split('<br>')[2] && doc.querySelector('div > h3.headline.headline-detailed-view-panel-title + p')?.innerHTML?.split('<br>')[1]?.replace('<b>', '')?.replace('</b>', '')?.replace(/\s+/g, ' ')?.trim();
                            const address = doc.querySelector('div > h3.headline.headline-detailed-view-panel-title + a')?.innerHTML?.replaceAll('<br>', '')?.replace(/\s+/g, ' ')?.trim();
                            //  Description
                            const desc = doc.getElementById('ad_description_text');
                            const description = desc?.innerText?.replace(/\s+/g, ' ')?.trim()
                            // Extract size and rent values
                            const size = classes1[0]?.innerHTML?.trim();
                            const rent = classes1[2]?.innerHTML?.trim();
                            let data: object = {
                                title,
                                size,
                                rent,
                                address,
                                freeFrom,
                                freeTo,
                                description
                            }
                            if (title) {
                                console.log(data);
                            } else {
                                alert('Make sure you are visiting the Booking page');
                            }
                        }

                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            } else {
                alert('Flatbot is made for www.wg-gesucht.de')
            }
        });
    }
    return (
        <main>
            <Button variant="primary" onClick={myFun}>Fetch data</Button>
        </main>
    );
}

export default Home;
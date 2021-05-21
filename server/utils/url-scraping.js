const puppeteer = require('puppeteer');
const Product = require('../models/Product');

const scrapingAmazon = async (url) => {
    
    if(!url) return null;
    // Here we can valite something more about url string
    
    // if url is for Amazon
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    )
    // Go to Amazon Product page
    try{
        await page.goto(url, {
            waitUntil:['load','domcontentloaded','networkidle0','networkidle2']
        })
        await page.waitForSelector('#productTitle');
        await page.waitForSelector('#priceblock_ourprice');
        
        // Extract information from page
        const {title, price, imageUrl} = await page.evaluate(()=>{
            const title = document.getElementById('productTitle').innerText
            const price = document.getElementById('priceblock_ourprice').innerText
            const imageUrl = document.getElementById('landingImage').getAttribute('src')
            return {title,price, imageUrl}
        });
    }
    catch(err){
        console.error(err)
        return null;
    }

    // Create object for return
    const product = new Product({
        title,
        price,
        imageUrl
    });
    
    await browser.close();

    return product;
}

module.exports = { scrapingAmazon }
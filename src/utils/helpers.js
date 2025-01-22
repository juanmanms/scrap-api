import { chromium } from "playwright";

const getProducts = async (url, selector, nameSelector) => {
    console.log('getProducts', url, selector, nameSelector);
    let browser;
    try {
        browser = await chromium.launch();
        const page = await browser.newPage();
        await page.goto(url);

        // Procesar fields y selectors desde nameSelector
        let fields = [];
        let selectors = [];

        nameSelector.forEach((element) => {
            fields.push(Object.keys(element)[0]);
            selectors.push(Object.values(element)[0]);
        });

        // Pasar los datos como un objeto a $$eval
        const products = await page.$$eval(selector, (elements, mapping) => {
            const { fields, selectors } = mapping;

            return elements.map((element) => {
                const product = {};
                selectors.forEach((sel, index) => {
                    console.log('sel', sel);
                    product[fields[index]] = element.querySelector(sel)?.textContent?.trim() || null;
                });
                return product;
            });
        }, { fields, selectors });

        return products;
    } catch (error) {
        console.error('Error in getProducts:', error);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

export { getProducts };
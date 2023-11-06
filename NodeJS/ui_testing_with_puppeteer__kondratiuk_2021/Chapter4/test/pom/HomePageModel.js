module.exports = class HomePageModel {
    constructor(page, config) {
        this.page = page;
        this.config = config;
    }

    async go() {
        await this.page.goto(this.config.baseURL);
    }

    async title() {
        return await this.page.title();
    }

    async getPrice(productName) {
        const productDiv = (await this.page.$x(`//a[text()="${productName}"]/../..`))[0];
        const priceElement  = (await productDiv.$x('./div[@class="row"]/p[1]'))[0];
        return await priceElement.evaluate(e => e.innerText);
    }

    async getStock(productName) {
        const productDiv = (await this.page.$x(`//a[text()="${productName}"]/../..`))[0];
        const stockElement = (await productDiv.$x('./h6'))[0];
        return await this.getInnerText(stockElement);
    }

    async switchToView(view) {
        const select = await this.page.$('#viewMode');
        await select.select(view);
    }

    async getInnerText(el) { return await el.evaluate(el => el.innerText) }
}
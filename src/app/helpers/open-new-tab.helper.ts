export class OpenNewTabHelper {
    public static openNewTab(url: string): void {
        const win = window.open(url, "_blank");
        win.focus();
    }
}

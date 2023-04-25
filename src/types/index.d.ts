type NotDefined<T> = T | null | undefined;
type Rule<T> = ((value: T) => boolean | string);
type Rules<T> = Array<Rule<T>>;

declare module '@signnow/api-client' {
    export default api as any;
}

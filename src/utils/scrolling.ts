import { FormInstance } from 'antd';

export const scrollToTop = (offsetTop: number) => {
    const container: any = window;
    container.scrollTo({ top: offsetTop, behavior: 'smooth' });
};

// TODO: See if we can consolidate usage of this and `scrollToFirstError`
export const scrollToErrorField = (headingOffset = 90) => {
    // include header height
    const errorFields: any = document.querySelectorAll(
            '.ant-form-item-has-error'
        ),
        topOffset = errorFields[0].offsetTop + headingOffset;
    scrollToTop(topOffset);
};

export const scrollToFirstError = (
    { errorFields }: any,
    form: FormInstance | null,
    offsetTop = 120
) => {
    if (form === null) return;

    form.scrollToField(errorFields[0].name, {
        behavior: (actions) =>
            actions.map(({ el, top }) =>
                el.scrollTo({ top: top - offsetTop, behavior: 'smooth' })
            ),
    });
};

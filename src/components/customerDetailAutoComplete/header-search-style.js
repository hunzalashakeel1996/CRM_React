import Styled from 'styled-components';

const Div = Styled.div`
    .ant-input{
        
    }
    .ant-input:focus{
        outline: 0;
        box-shadow: none;
    }
    .certain-category-icon{
        font-size: 16px;
        position: relative;
        bottom: -2px;
        color: ${({ theme, darkMode }) => (darkMode ? `#A8AAB3;` : theme['gray-color'])};
        @media only screen and (max-width: 767px){
            bottom: 0;
        }
        svg{
            margin-top: 4px;
            @media only screen and (max-width: 767px){
                width: 12px;
            }
        }
    }
    .testing .ant-col{
        max-width: 100% !important;
        width: 100% !important;
        margin: 0;
        padding: 0;
        display: block;
        flex: 0 0 100%
    }
`;

export { Div };

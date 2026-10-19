import styled from "styled-components";

export const SummaryStyled = styled.div`
    height: fit-content;
    width: 280px;
    padding: 24px;
    background-color: ${(props) => props.theme.palette.main};
    border: 1px solid ${props=> props.theme.palette.ColorApp.gray_200};
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
    color: ${(props) =>  props.theme.palette.font};
    font-size: ${(props) => props.theme.fontSizes.body}rem;           
    .info li, .total {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0;
    }
    .info li:nth-child(2) p:nth-child(2){
        color: #e53e3e;
    }
    .info li:nth-child(3) p:nth-child(2){
        color: ${props=> props.theme.palette.ColorApp.green};
    }
    .total{
        font-weight: 700;
        font-size: 1.1rem;
        p:last-child{
            font-size: 1.3rem;
            color: ${props=> props.theme.palette.ColorApp.primary};
        }
    }
    .info{
        border-bottom: 1px solid ${props=> props.theme.palette.ColorApp.gray_200};
        padding-bottom: 12px;
    }
    button{
        color: ${(props) =>  props.theme.palette.ColorApp.white};
        background: ${(props) => props.theme.palette.ColorApp.primary_gradient};
        margin: 16px 0 0;
        border-radius: 30px;
        font-weight: 700;
        font-size: 1rem;
        height: 44px;
        box-shadow: 0 4px 14px rgba(109, 40, 217, 0.3);
        transition: all 0.25s ease;
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(109, 40, 217, 0.45);
        }
    }

    .quickWaSummaryBtn {
        width: 100%;
        height: 42px;
        margin-top: 10px;
        border-radius: 30px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
        color: #ffffff !important;
        font-weight: 700;
        font-size: 0.92rem;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25) !important;
        transition: all 0.25s ease;

        &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(16, 185, 129, 0.35) !important;
            background: linear-gradient(135deg, #059669 0%, #047857 100%) !important;
        }

        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
    }
`;
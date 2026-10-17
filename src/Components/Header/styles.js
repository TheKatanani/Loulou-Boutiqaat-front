import styled from "styled-components";

export const StyledHeader = styled.header `
    padding: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    background-color: ${(props)=>props.theme.palette.main}f5;
    transition: background-color 0.3s, box-shadow 0.3s;
    border-bottom: 1px solid ${(props)=>props.theme.palette.ColorApp.gray_200};

    .topAnnouncement {
        background: linear-gradient(90deg, #4c1d95, #6d28d9, #4c1d95);
        color: #ffffff;
        font-size: 0.78rem;
        font-weight: 600;
        text-align: center;
        padding: 6px 12px;
        letter-spacing: 0.3px;
        span {
            direction: rtl;
            display: inline-block;
        }
        @media (max-width: 576px) {
            font-size: 0.72rem;
            padding: 4px 8px;
        }
    }

    .mainRow {
        display: flex;
        gap: 16px;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px !important;
    }

    .logoBox {
        display: flex;
        align-items: center;
        gap: 12px;
        > svg {
            display: none;
        }
    }

    .menu {
        display: none;
        cursor: pointer;
    }

    .headerActions {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .authZone {
        display: flex;
        align-items: center;
    }

    .authButtons {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .loginPill {
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 0.88rem;
        font-weight: 600;
        color: ${(props)=>props.theme.palette.font};
        border: 1px solid ${(props)=>props.theme.palette.ColorApp.gray_300};
        background: transparent;
        transition: all 0.2s ease;
        &:hover {
            border-color: ${(props)=>props.theme.palette.ColorApp.primary};
            color: ${(props)=>props.theme.palette.ColorApp.primary};
        }
    }

    .registerPill {
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 0.88rem;
        font-weight: 600;
        color: #ffffff;
        background: ${(props)=>props.theme.palette.ColorApp.primary_gradient};
        box-shadow: 0 2px 8px rgba(109, 40, 217, 0.25);
        transition: all 0.2s ease;
        &:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(109, 40, 217, 0.35);
        }
    }

    .userLoggedIn {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .dashboardPill {
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 0.84rem;
        font-weight: 700;
        color: ${(props)=>props.theme.palette.ColorApp.primary};
        background: ${(props)=>props.theme.palette.ColorApp.primary_soft};
        border: 1px solid ${(props)=>props.theme.palette.ColorApp.primary_light};
        transition: all 0.2s ease;
        &:hover {
            background: ${(props)=>props.theme.palette.ColorApp.primary};
            color: #ffffff;
        }
    }

    .logoutPill {
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 0.84rem;
        font-weight: 600;
        color: ${(props)=>props.theme.palette.ColorApp.gray_600};
        background: ${(props)=>props.theme.palette.ColorApp.gray_100};
        border: 1px solid ${(props)=>props.theme.palette.ColorApp.gray_300};
        cursor: pointer;
        transition: all 0.2s ease;
        &:hover {
            background: #ef4444;
            color: #ffffff;
            border-color: #ef4444;
        }
    }

    .categoriesPart { 
        display: flex;
        justify-content: center;
        border-top: 1px solid ${(props)=>props.theme.palette.ColorApp.gray_200};
        padding: 4px 0;
    }

    /* Small screens / Mobile */
    ${({theme})=>theme.media.xs}{
        .menu {
            display: block;
        }
        .mainRow {
            flex-wrap: wrap;
            justify-content: space-between;
        }
        .headerActions {
            .authZone {
                display: none;
            }
        }
        .layout {
            position: fixed;
            top: 0;
            width: 100vw;
            height: 100vh;
            background-color: #00000052;
            z-index: 9999;
            transition: 0.3s;
        }
    }
`
import styled from "styled-components";

export const StyledDashboard = styled.div`
  direction: rtl;
  min-height: 100vh;
  background-color: ${({theme}) => theme.palette.page};

  .content {
    display: flex; 
    min-height: 100vh;
    position: relative;
  }

  .layout {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 998;
  }

  aside {
    width: 250px;
    min-width: 250px;
    background-color: ${({theme}) => theme.palette.card};
    border-left: 1px solid ${({theme}) => theme.palette.border};
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.03);
    padding: 25px 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 999;
    transition: all 0.3s ease;

    .sidebarBrand {
      padding: 0 10px 20px 10px;
      border-bottom: 1px solid ${({theme}) => theme.palette.border};
      margin-bottom: 16px;
      h3 {
        font-size: 1.15rem;
        font-weight: 800;
        color: ${({theme}) => theme.palette.ColorApp.primary};
        display: flex;
        align-items: center;
        gap: 8px;
      }
      p {
        font-size: 0.78rem;
        color: ${({theme}) => theme.palette.font_secondary};
        margin-top: 4px;
      }
    }

    .mobileToggleBtn {
      display: none;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;

      li a {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-radius: 12px;
        color: ${({theme}) => theme.palette.font};
        font-size: 0.92rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.2s ease;

        .navIcon {
          font-size: 1.15rem;
          line-height: 1;
        }

        &:hover {
          background-color: ${({theme}) => theme.palette.ColorApp.primary_soft};
          color: ${({theme}) => theme.palette.ColorApp.primary};
          transform: translateX(-3px);
        }

        &.active {
          background: ${({theme}) => theme.palette.ColorApp.primary_gradient};
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(109, 40, 217, 0.25);
        }
      }
    }

    .sidebarFooter {
      padding-top: 16px;
      border-top: 1px solid ${({theme}) => theme.palette.border};
      display: flex;
      flex-direction: column;
      gap: 12px;

      .storeLink {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 10px 14px;
        border-radius: 12px;
        background: ${({theme}) => theme.palette.main};
        border: 1px solid ${({theme}) => theme.palette.border};
        color: ${({theme}) => theme.palette.font};
        font-size: 0.88rem;
        font-weight: 700;
        text-decoration: none;
        transition: all 0.2s ease;
        &:hover {
          border-color: ${({theme}) => theme.palette.ColorApp.primary};
          color: ${({theme}) => theme.palette.ColorApp.primary};
        }
      }
    }

    @media (max-width: 768px) {
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      width: 250px;
      &.colsed {
        right: -260px;
      }
      &.opened {
        right: 0;
      }
      .mobileToggleBtn {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 20px;
        left: -40px;
        width: 40px;
        height: 40px;
        background: ${({theme}) => theme.palette.ColorApp.primary};
        color: #ffffff;
        border: none;
        border-radius: 10px 0 0 10px;
        cursor: pointer;
        font-size: 1.1rem;
        box-shadow: -3px 3px 10px rgba(0,0,0,0.15);
      }
    }
  }

  main {
    flex: 1;
    padding: 30px 40px;
    max-width: 1300px;
    margin: 0 auto;
    width: 100%;
    overflow-x: hidden;

    @media (max-width: 768px) {
      padding: 20px 14px;
    }

    .dashboardHeader {
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;

      .pageTitle {
        font-size: 1.5rem;
        font-weight: 800;
        color: ${({theme}) => theme.palette.font};
      }
      .userBadge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 0.82rem;
        font-weight: 700;
        background: ${({theme}) => theme.palette.ColorApp.primary_soft};
        color: ${({theme}) => theme.palette.ColorApp.primary};
        border: 1px solid ${({theme}) => theme.palette.ColorApp.primary_light};
      }
    }
  }

  footer {
    border-top: 1px solid ${({theme}) => theme.palette.border};
  }
`;

export const StyledForm = styled.form` 
  margin: 20px 0;
  padding: 26px;
  border-radius: 18px;
  background-color: ${({theme}) => theme.palette.card};
  border: 1px solid ${({theme}) => theme.palette.border};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

  .formTitle {
    font-size: 1.15rem;
    font-weight: 800;
    color: ${({theme}) => theme.palette.font};
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .cansel {
    margin: 10px 0;
    background: transparent !important;
    border: 1.5px solid ${({theme}) => theme.palette.border} !important;
    color: ${({theme}) => theme.palette.font_secondary} !important;
    border-radius: 12px;
    padding: 8px 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
      border-color: #ef4444 !important;
      color: #ef4444 !important;
    }
  }

  .d-flex {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    margin-top: 14px;
    > div {
      flex: 1;
      width: 100%;
    }
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 10px;
    }
    .input, .select, select {
      width: 100%;
    }
  }

  button[type="submit"] {
    margin-top: 20px;
    border-radius: 12px;
    font-weight: 700;
  }
`;

export const StyledAdd = styled.div`
  #description {
    resize: vertical;
    min-height: 90px;
    border-radius: 12px;
    padding: 12px;
    border: 1.5px solid ${({theme}) => theme.palette.border};
    background-color: ${({theme}) => theme.palette.main};
    color: ${({theme}) => theme.palette.font};
    width: 100%;
    font-family: inherit;
    &:focus {
      border-color: ${({theme}) => theme.palette.ColorApp.primary};
      outline: none;
    }
  }

  .searchContainer {
    margin: 24px 0 16px 0;
    .input {
      input {
        background-color: ${({theme}) => theme.palette.card};
        border: 1.5px solid ${({theme}) => theme.palette.border};
        border-radius: 14px;
        padding: 12px 18px;
        font-size: 0.92rem;
        &:focus {
          border-color: ${({theme}) => theme.palette.ColorApp.primary};
        }
      }
    }
  }
`;

export const StyledTable = styled.div`
  direction: rtl;
  width: 100%;
  overflow-x: auto;
  margin: 20px 0;
  background-color: ${({theme}) => theme.palette.card};
  border: 1px solid ${({theme}) => theme.palette.border};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    text-align: right;
  }

  th {
    background-color: ${({theme}) => theme.palette.ColorApp.primary_soft};
    color: ${({theme}) => theme.palette.ColorApp.primary};
    font-size: 0.88rem;
    font-weight: 700;
    padding: 14px 18px;
    white-space: nowrap;
    border-bottom: 1.5px solid ${({theme}) => theme.palette.border};
    &:first-child {
      border-top-right-radius: 15px;
    }
    &:last-child {
      border-top-left-radius: 15px;
    }
  }

  td {
    padding: 14px 18px;
    color: ${({theme}) => theme.palette.font};
    font-size: 0.88rem;
    border-bottom: 1px solid ${({theme}) => theme.palette.border};
    vertical-align: middle;
    white-space: nowrap;

    &.phone {
      direction: ltr;
      text-align: right;
      font-family: monospace;
      font-size: 0.92rem;
    }

    &.images {
      img {
        width: 44px;
        height: 44px;
        border-radius: 10px;
        border: 1.5px solid ${({theme}) => theme.palette.border};
        object-fit: cover;
        margin-left: 6px;
        transition: transform 0.2s ease;
        &:hover {
          transform: scale(1.15);
        }
      }
    }

    .statusBadge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      border-radius: 14px;
      font-size: 0.78rem;
      font-weight: 700;
      &.published {
        background: #ecfdf5;
        color: #059669;
        border: 1px solid #a7f3d0;
      }
      &.unpublished {
        background: #fef2f2;
        color: #dc2626;
        border: 1px solid #fecaca;
      }
    }

    button, a.actionBtn {
      padding: 6px 14px;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.82rem;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      border: none;
      text-decoration: none;

      &.update {
        background: ${({theme}) => theme.palette.ColorApp.primary_soft};
        color: ${({theme}) => theme.palette.ColorApp.primary};
        border: 1px solid ${({theme}) => theme.palette.ColorApp.primary_light};
        &:hover {
          background: ${({theme}) => theme.palette.ColorApp.primary};
          color: #ffffff;
        }
      }

      &.delete {
        background: #fef2f2;
        color: #ef4444;
        border: 1px solid #fee2e2;
        &:hover {
          background: #ef4444;
          color: #ffffff;
        }
      }
    }
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background-color: ${({theme}) => theme.palette.ColorApp.primary_soft}22;
  }

  tr.underUpdate td {
    background-color: ${({theme}) => theme.palette.ColorApp.primary_soft}66;
  }
`;
import styled from "styled-components";

export const StyledRigisterForm = styled.form`
  direction: rtl;
  width: 100%;
  padding: 0;
  margin: 0;

  .phoneGroup {
    margin-bottom: 14px;

    label {
      display: block;
      font-weight: 700;
      font-size: 0.88rem;
      color: ${(props) => props.theme.palette.font};
      margin-bottom: 6px;
    }

    .phoneInputs {
      display: flex;
      align-items: center;
      direction: rtl;

      select {
        width: 145px;
        min-width: 145px;
        height: 46px;
        border-radius: 0 12px 12px 0;
        border: 1.5px solid ${(props) => props.theme.palette.border};
        border-left: none;
        background-color: ${(props) => props.theme.palette.main};
        color: ${(props) => props.theme.palette.font};
        font-weight: 600;
        font-size: 0.88rem;
        padding: 0 12px;
        outline: none;
        &:focus {
          border-color: ${(props) => props.theme.palette.ColorApp.primary};
        }
      }

      input {
        flex: 1;
        height: 46px;
        border-radius: 12px 0 0 12px;
        border: 1.5px solid ${(props) => props.theme.palette.border};
        background-color: ${(props) => props.theme.palette.main};
        color: ${(props) => props.theme.palette.font};
        padding: 0 16px;
        margin: 0;
        direction: ltr;
        text-align: left;
        font-family: monospace;
        font-size: 0.95rem;
        outline: none;
        &:focus {
          border-color: ${(props) => props.theme.palette.ColorApp.primary};
        }
      }
    }
  }

  .genderGroup {
    margin: 16px 0;

    .genderLabel {
      display: block;
      font-weight: 700;
      font-size: 0.88rem;
      color: ${(props) => props.theme.palette.font};
      margin-bottom: 8px;
    }

    .genderOptions {
      display: flex;
      gap: 12px;

      label {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 10px 14px;
        border-radius: 12px;
        border: 1.5px solid ${(props) => props.theme.palette.border};
        background-color: ${(props) => props.theme.palette.main};
        color: ${(props) => props.theme.palette.font};
        font-weight: 700;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s ease;

        input[type="radio"] {
          accent-color: ${(props) => props.theme.palette.ColorApp.primary};
          width: 16px;
          height: 16px;
          margin: 0;
        }

        &.selected {
          border-color: ${(props) => props.theme.palette.ColorApp.primary};
          background-color: ${(props) => props.theme.palette.ColorApp.primary_soft};
          color: ${(props) => props.theme.palette.ColorApp.primary};
        }
      }
    }
  }

  .dateGroup {
    margin-bottom: 16px;
    label {
      display: block;
      font-weight: 700;
      font-size: 0.88rem;
      color: ${(props) => props.theme.palette.font};
      margin-bottom: 6px;
    }
    input[type="date"] {
      width: 100%;
      height: 46px;
      border-radius: 12px;
      border: 1.5px solid ${(props) => props.theme.palette.border};
      background-color: ${(props) => props.theme.palette.main};
      color: ${(props) => props.theme.palette.font};
      padding: 0 16px;
      font-family: inherit;
      outline: none;
      direction: rtl;
      &:focus {
        border-color: ${(props) => props.theme.palette.ColorApp.primary};
      }
    }
  }

  .submitArea {
    margin-top: 24px;
  }
`;
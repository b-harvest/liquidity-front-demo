import styled from 'styled-components'

export const DepositCard = styled.div`
    position:absolute;
    width: 460px;
    height: 360px;
    padding: 96px 20px 20px;
    background-color:#fff;
    transform: translateX( -50%);
    top: 120px;
    left: 50%;
    border-radius: 8px;
    border: 1px solid #bdbdbd;
`

export const ResetButton = styled.div`
    display:inline-block;
    width: 120px;
    height: 24px;
    color: black;
    font-size:20px;
    line-height: 24px;
    position: absolute;
    left: 20px;
    top: 36px;
    border-radius:24px;
    cursor:pointer;
    font-weight:bold;
`

export const Detail = styled.div`
    display: flex;
    font-weight: bold;
    div {
        flex: 1;
        text-align:right;
    }
    div:first-child {
        text-align: left;
    }
`
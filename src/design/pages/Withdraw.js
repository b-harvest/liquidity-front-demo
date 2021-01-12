import styled from 'styled-components'

export const DepositCard = styled.div`
    position:absolute;
    width: 460px;
    padding: 20px 20px 20px;
    background-color:#fff;
    transform: translateX( -50%);
    top: 160px;
    left: 50%;
    border-radius: 8px;
    border: 1px solid #bdbdbd;
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

    margin-bottom: 8px;
`
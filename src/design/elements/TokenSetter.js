import styled from 'styled-components';

export const TokenCard = styled.section`

    margin: 0 auto;

    border-radius: 8px;
    border: 2px solid black;
    padding: 10px 20px;
    display:flex;
`
export const Title = styled.div`
    font-weight: 400;
    font-size: 14px;
    color:#777777;
    margin-bottom: 8px;
`
export const Left = styled.div`
    flex:1;
    text-align:left;
    height: 60px;
`
export const Right = styled(Left)`
    text-align:right;
`
export const ArrowEraser = styled.div`
    width: 20px;
    height: 20px;
    background-color: white;
    display: inline-block;
    transform: translate(-14px, 3px);
`
export const TokenSelector = styled.select` 
    padding: 0 ;
    cursor: pointer;
    border-radius: 8px;
    height: 32px;
    font-weight: 700;
    font-size:18px;
    line-height: 32px;
    border: none;
    outline: none;
`
export const DepositInput = styled.input`
    padding: 0 12px;
    cursor: pointer;
    border-radius: 8px;
    height: 32px;
    font-size:18px;
    font-weight: 700;
    line-height: 32px;
    border: none;
    text-align:right;
    outline: none;
`
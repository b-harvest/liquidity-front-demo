import styled from 'styled-components';

export const Card = styled.div`
    border-radius: 8px;
    background-color:#eef5ff;
    padding: 20px;
    margin-top: 30px;
`


export const Button = styled.div`
    margin: 20px auto 0 auto;
    display:inline-block;
    padding: 0 40px;
    border-radius:24px;
    cursor:pointer;
    height: 40px;
    font-size: 20px;
    line-height: 40px;
    color: #fff;
    background-color: #4297ff;
    transition: opacity 0.3s;
    &:hover {
        opacity: 0.7;
    }
`
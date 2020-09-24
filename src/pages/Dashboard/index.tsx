import React, { useEffect, useState, useCallback } from 'react';
import { Alert } from 'react-native';

import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, 
        TopTextName, 
        TopTextPrice, 
        TopScrollView, 
        TopView,
        TopBoxInfo,
        TopTitle,
        HistoricalView,
        HistoricalBoxInfo,
        HistoricalTextName,
        HistoricalTextPrice,
        HistoricalTextPriceLow,
        HistoricalBoxTitle,
        HistoricalBoxText,
        } from './styles';

interface CoinProperties {
    coinName : string;
    coinPrice: string ;
}

interface CoinHistoricalProperties {
    time : number;
    high: string ;
    low: string;
}
   

const Dashboard: React.FC = () => {
    const [rank, setRank] = useState<CoinProperties[]>([]);
    const [myCoin, setMyCoin] = useState<CoinHistoricalProperties []>([]);
    const [coinType, setCoinType] = useState<String>('');
    const [update, setUpdate] = useState<Boolean>(true);


    function formatData (time: number) {
        const testDate = new Date (time * 1000);

        const year = testDate.getFullYear();
        const month = testDate.getMonth() + 1;
        const day = testDate.getDate();

        const date = day + '/' + month + '/' + year

        return date;
    }

    async function handleHistoricalData () {
        setUpdate(!update);
        try{
            setMyCoin([]);
            await api.get(`mycoin?coinType=${coinType}`).then(response => {
                setMyCoin(response.data);
              });
        }catch(e){
            Alert.alert('Erro na busca', 'Digite uma sigla válida');
        }
    }
     
    useEffect(() => {
        api.get('top10').then(response => {
            setRank(response.data);
          });
    }, [update])

    return (
        <Container>
            <TopView>
                <TopTitle>10 Maiores Criptomoedas</TopTitle>
                <TopScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                {rank.map(data  => (
                    <TopBoxInfo key= {data.coinName}>
                        <TopTextName>{data.coinName}</TopTextName>
                        <TopTextPrice>{data.coinPrice}</TopTextPrice>
                    </TopBoxInfo>
                ))}
                </TopScrollView>
            </TopView>

            <Input  
                name = "coin" 
                icon = "user" 
                placeholder="Sigla da Moeda"
                onChangeText = {text => setCoinType(text)}
            />
            <Button onPress={() => handleHistoricalData ()}>Buscar moeda</Button>

            <HistoricalView>
                <TopScrollView
                        showsHorizontalScrollIndicator={false}
                    >
                    <HistoricalBoxTitle>
                        <HistoricalBoxText>Date</HistoricalBoxText>
                        <HistoricalBoxText>High</HistoricalBoxText>
                        <HistoricalBoxText>Low</HistoricalBoxText>
                    </HistoricalBoxTitle>

                    {myCoin.map(data => (
                        <HistoricalBoxInfo key={data.time}>
                            <HistoricalTextName>{formatData(data.time)}</HistoricalTextName>
                            <HistoricalTextPrice>R$:{data.high}</HistoricalTextPrice>
                            <HistoricalTextPriceLow>R$:{data.low}</HistoricalTextPriceLow>
                        </HistoricalBoxInfo>
                    ))
                        
                    }

                </TopScrollView>
            </HistoricalView>

        </Container>
    );
}

export default Dashboard;
use anyhow::Result;
use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct OrdClient {
    base_url: String,
    client: Client,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Inscription {
    pub id: String,
    pub number: u64,
    pub address: String,
    pub genesis_address: String,
    pub genesis_block_height: u64,
    pub genesis_block_hash: String,
    pub genesis_tx_id: String,
    pub genesis_fee: String,
    pub genesis_timestamp: u64,
    pub tx_id: String,
    pub location: String,
    pub output: String,
    pub value: String,
    pub offset: String,
    pub content_type: Option<String>,
    pub content_length: Option<u64>,
    pub timestamp: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RuneBalance {
    pub rune_id: String,
    pub balance: u64,
    pub address: String,
}

impl OrdClient {
    pub fn new(base_url: String) -> Self {
        Self {
            base_url,
            client: Client::new(),
        }
    }
    
    /// Get inscription by ID
    pub async fn get_inscription(&self, inscription_id: &str) -> Result<Inscription> {
        let url = format!("{}/inscription/{}", self.base_url, inscription_id);
        let response = self.client.get(&url).send().await?;
        let inscription: Inscription = response.json().await?;
        Ok(inscription)
    }
    
    /// Get Rune balance for an address
    pub async fn get_rune_balance(&self, address: &str, rune_id: &str) -> Result<RuneBalance> {
        let url = format!("{}/address/{}/rune/{}", self.base_url, address, rune_id);
        let response = self.client.get(&url).send().await?;
        let balance: RuneBalance = response.json().await?;
        Ok(balance)
    }
    
    /// Get all Runes for an address
    pub async fn get_address_runes(&self, address: &str) -> Result<Vec<RuneBalance>> {
        let url = format!("{}/address/{}/runes", self.base_url, address);
        let response = self.client.get(&url).send().await?;
        let runes: Vec<RuneBalance> = response.json().await?;
        Ok(runes)
    }
    
    /// Get Rune info by ID
    pub async fn get_rune_info(&self, rune_id: &str) -> Result<serde_json::Value> {
        let url = format!("{}/rune/{}", self.base_url, rune_id);
        let response = self.client.get(&url).send().await?;
        let info: serde_json::Value = response.json().await?;
        Ok(info)
    }
} 
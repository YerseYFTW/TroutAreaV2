import { GenezioDeploy, GenezioMethod } from "@genezio/types";
import fetch from "node-fetch";
import  pg from 'pg';
const {Pool} = pg;
import dotenv from 'dotenv';

dotenv.config();

type SuccessResponse = {
  status: "success";
  country: string;
  lat: number;
  lon: number;
  city: string;
};

console.log("PostgreSQL connection string:", process.env.NEON_POSTGRES_URL);

type ErrorResponse = {
  status: "fail";
};

@GenezioDeploy()
export class BackendService {
  pool = new Pool();
  constructor() {
    console.log("Backend service is up and running!");
    this.pool = new Pool({
      connectionString: process.env.NEON_POSTGRES_URL,
      ssl: true,
    });
  }

  /*@GenezioMethod()
  async hello(name: string): Promise<string> {
    const ipLocation: SuccessResponse | ErrorResponse = await fetch(
      "http://ip-api.com/json/"
    )
      .then((res) => res.json() as Promise<SuccessResponse>)
      .catch(() => ({ status: "fail" }));

    if (ipLocation.status === "fail") {
      return `Hello ${name}! Failed to get the server location :(`;
    }

    const formattedTime = new Date().toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `Hello ${name}! This response was served from ${ipLocation.city}, ${ipLocation.country} (${ipLocation.lat}, ${ipLocation.lon}) at ${formattedTime}`;
  };*/

  @GenezioMethod()
  async getCode(stand: string): Promise<string> {
  
    const result = await this.pool.query("select cod_privat, inregistrat from setup_standuri where stand=$1",[stand]);

    return JSON.stringify(result);

  }

  @GenezioMethod()
  async getNumeStand(stand: string): Promise<string> {
    const nume = await this.pool.query("select nume from participanti where stand_start=$1",[stand]);

    return JSON.stringify(nume);
  }

  @GenezioMethod()
  async getClasament():Promise<string>{
    const clasament = await this.pool.query("select nume,capturi_total,puncte_total from participanti order by puncte_total desc, capturi_total desc");
  
    return JSON.stringify(clasament);
  }


  @GenezioMethod()
  async addParticipant(nume:string,stand:string,cheie:string): Promise<string> {
    try{
    const registerr = await this.pool.query("insert into participanti (nume,stand_start,cod_secret,capturi_total,puncte_total)values($1,$2,$3,0,0)",[nume,stand,cheie]);
    const setInregistrat = await this.pool.query("update setup_standuri set inregistrat= TRUE where stand=$1",[stand])
    return "a mers bine, e inregistrat";
  }
  catch{
    return "a dat eroare";
  }
  
  }

  @GenezioMethod()
  async addEtapa(sector_start:string,standet:string,capturi_prop:string,capturi_adv:string,puncte:string,mentiuni_adv:string,cod_privat_adversar:string):Promise<string>{
    try{
      
    const registerr = await this.pool.query("insert into rezultate_etape (sector_start,standet,capturi_proprii,capturi_adversar,puncte,mentiuni,cod_privat_adversar)values($1,$2,$3,$4,$5,$6,$7)",[sector_start,standet,capturi_prop,capturi_adv,puncte,mentiuni_adv,cod_privat_adversar]);
    const adding = await this.pool.query("update participanti set capturi_total = capturi_total+$1, puncte_total = puncte_total +$2 where stand_start=$3",[capturi_prop,puncte,sector_start]);
    return "etapa a fost inregistrata";
    }catch(error){
      console.error("Eroare la trimitere:", error);
      return "eroare la trimitere"
    }
  }


  @GenezioMethod()
  async getMeciuri(sector_start:string):Promise<string>{
    try{
    const raspuns_meciuri = await this.pool.query("select * from rezultate_etape where sector_start=$1",[sector_start]);

    return JSON.stringify(raspuns_meciuri.rows);
  }catch(error){
    console.error("Eroare la trimitere:", error);
    return "eroare la trimitere"
  }
  }
}

/*
import { GenezioDeploy } from "@genezio/types";
//import { Pool } from "pg";
import pg from "pg";
const { Pool } = pg;


// highlight-next-line
@GenezioDeploy()
export class HelloWorldClass {
  pool = new Pool({
    connectionString: process.env.NEON_POSTGRES_URL,
    ssl: true,
  });

  async insertUser(name: string): Promise<string> {
    await this.pool.query(
      "CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY,name VARCHAR(255))"
    );

    await this.pool.query("INSERT INTO users (name) VALUES ($1)", [name]);
    const result = await this.pool.query("select * from users");

    return JSON.stringify(result.rows);
  }
  
}*/

/*import { GenezioDeploy } from "@genezio/types";
import pg from "pg";
const { Pool } = pg;

@GenezioDeploy()
export class PostgresService {
  pool = new Pool({
    connectionString: process.env.NEON_POSTGRES_URL,
    ssl: true,
  });

  async insertUser(name: string): Promise<string> {
    await this.pool.query(
      "CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY,name VARCHAR(255))"
    );

    await this.pool.query("INSERT INTO users (name) VALUES ($1)", [name]);
    const result = await this.pool.query("select * from users");

    return JSON.stringify(result.rows);
  }
}*/
/**
 * [PL] UNIWERSALNY UTIL DO OBSŁUGI BAZ DANYCH (SQL)
 * Ten moduł pozwala na komunikację z bazami SQL (Postgres, MySQL, itp.).
 * Aby użyć konkretnej bazy:
 * 1. Zainstaluj paczkę: npm install pg (dla Postgres) lub npm install mysql2 (dla MySQL)
 * 2. Zainstaluj typy: npm install @types/pg --save-dev
 * 3. Odkomentuj odpowiedni import i logikę połączenia poniżej.
 * [EN] UNIVERSAL SQL DATABASE UTILITY
 * This module allows communication with SQL databases (Postgres, MySQL, etc.).
 * To use a specific database:
 * 1. Install the package: npm install pg (for Postgres) or npm install mysql2 (for MySQL)
 * 2. Install types: npm install @types/pg --save-dev
 * 3. Uncomment the appropriate import and connection logic below.
 */

// WYBÓR STEROWNIKA (ODKOMENTUJ WŁAŚCIWY / DRIVER SELECTION (UNCOMMENT THE APPROPRIATE ONE)
import { Client } from 'pg'; // Dla PostgreSQL / For PostgreSQL
// import mysql from 'mysql2/promise'; // Dla MySQL / For MySQL

import { testConfig } from '../testConfig';

export class DBUtil {
  /**
   * Metoda bazowa do wykonywania surowych zapytań SQL. / Base method for executing raw SQL queries.
   */
  async executeQuery(query: string): Promise<any[]> {
    // --- KONFIGURACJA DLA POSTGRES --- / CONFIGURATION FOR POSTGRES
    const client = new Client({
      host: testConfig.dbServerName,
      port: parseInt(testConfig.dbPort),
      user: testConfig.dbUsername,
      password: testConfig.dbPassword,
      database: testConfig.dbName,
    });
    await client.connect();

    // KONFIGURACJA DLA MYSQL (Alternatywa) / CONFIGURATION FOR MYSQL (Alternative)
    /*
    const connection = await mysql.createConnection({
        host: testConfig.dbServerName,
        port: parseInt(testConfig.dbPort),
        user: testConfig.dbUsername,
        password: testConfig.dbPassword,
        database: testConfig.dbName
    });
    */

    try {
      console.log(`[DB Query] ${query}`);
      /**
       * Dla Postgres używamy client.query, dla MySQL connection.execute /
       * For Postgres we use client.query, for MySQL connection.execute
       */
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error(`[DB Error] ${error}`);
      throw error;
    } finally {
      await client.end(); // Zamykanie połączenia
    }
  }

  /**
   * Sprawdza, czy w danej tabeli istnieje rekord spełniający warunek. / Checks if a record exists in a given table that meets the condition.
   */
  async isRecordPresent(tableName: string, condition: string): Promise<boolean> {
    const result = await this.executeQuery(
      `SELECT COUNT(*) as count FROM ${tableName} WHERE ${condition}`,
    );
    return parseInt(result[0].count) > 0;
  }

  /**
   * Pobiera pojedynczą wartość z konkretnej kolumny. / Fetches a single value from a specific column.
   */
  async getSingleValue(
    tableName: string,
    columnName: string,
    condition: string,
  ): Promise<string | null> {
    const result = await this.executeQuery(
      `SELECT ${columnName} FROM ${tableName} WHERE ${condition} LIMIT 1`,
    );
    return result.length > 0 ? result[0][columnName].toString() : null;
  }

  /**
   * Czyści tabelę i resetuje licznik ID (RESTART IDENTITY przydatne w Postgres). / Clears the table and resets the ID counter (RESTART IDENTITY is useful in Postgres).
   */
  async truncateTable(tableName: string): Promise<void> {
    await this.executeQuery(`TRUNCATE TABLE ${tableName} RESTART IDENTITY CASCADE`);
  }
}

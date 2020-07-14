import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import Author from './author.entity' 

@Entity()
class Book {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public title: string;

  @ManyToMany(type => Author)
  @JoinTable()
  categories: Author[];

}
 
export default Book;
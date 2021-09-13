import { EntityRepository, Repository } from "typeorm";
import { Photo } from "../database/entities/photo.entity";

@EntityRepository(Photo)
export class PhotoRepository extends Repository<Photo> {}
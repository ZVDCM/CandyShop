using System;
using CandyShop.Application.Features.Candies.Commands.Create;
using CandyShop.Application.Features.Candies.Commands.Delete;
using CandyShop.Application.Features.Candies.Commands.Update;
using CandyShop.Application.Features.Candies.Queries.GetCandy;
using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Entities.Candies.Dtos;
using Mapster;

namespace CandyShop.Api.Configurations.Mappings;

public sealed class CandyMappings : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<CreateCandyRequest, CreateCandyCommand>()
            .MapWith(r => new CreateCandyCommand(
                Candy.Create(r.Name, r.Quantity, r.Image, r.Price)));
        config.NewConfig<Guid, GetCandyQuery>()
            .MapWith(id => new GetCandyQuery(new CandyId(id)));
        config.NewConfig<(Guid, UpdateCandyRequest), UpdateCandyCommand>()
            .MapWith(src => new UpdateCandyCommand(
                new CandyId(src.Item1),
                src.Item2.Name,
                src.Item2.Quantity,
                src.Item2.Image,
                src.Item2.Price));
        config.NewConfig<Guid, DeleteCandyCommand>()
            .MapWith(id => new DeleteCandyCommand(new CandyId(id)));
        config.NewConfig<Candy, CandyResponse>()
            .MapWith(c => new CandyResponse(
                c.Id.Value,
                c.Name,
                c.Quantity,
                c.Image,
                c.Price));
    }
}